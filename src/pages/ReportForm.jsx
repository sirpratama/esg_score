import React, { useState } from "react";
import "./ReportForm.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { 
  parsePDFWithGemini, 
  processMultiplePDFs, 
  saveParsedDataToSupabase 
} from "../services/geminiService";
import { calculateESGScore, saveESGScore } from "../services/esgScoringService";
import { 
  saveESGSubmission, 
  saveESGScores, 
  updateUserESGProfile,
  userHasESGData 
} from "../services/esgDataService";

const steps = [
  { label: "General" },
  { label: "Environmental" },
  { label: "Social" },
  { label: "Governance" },
];

export default function ReportForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    businessName: "",
    alamat: "",
    kelurahan: "",
    kecamatan1: "",
    kecamatan2: "",
    kabupaten: "",
    provinsi: "",
    kodePos: "",
    email: "",
    phone: "",
    // Environmental
    electricityBill: null,
    waterBill: null,
    transportUse: "",
    transportBill: null,
    // Social
    numEmployees: null,
    employeesHealth: null,
    communityEngagement: null,
    // Governance
    ownershipStructure: null,
    businessRegulation: null,
    taxCompliance: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState({});
  const [parsedData, setParsedData] = useState({});
  const navigate = useNavigate();
  const [fileNames, setFileNames] = useState({});
  const [esgScore, setEsgScore] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    setForm((prev) => ({ ...prev, [name]: file }));
    setFileNames((prev) => ({ ...prev, [name]: file ? file.name : "" }));

    // If it's a PDF file, process it immediately
    if (file && file.type === 'application/pdf') {
      await processSingleFile(file, name);
    }
  };

  const processSingleFile = async (file, documentType) => {
    setProcessingStatus(prev => ({
      ...prev,
      [documentType]: { status: 'processing', message: 'Analyzing document with AI...' }
    }));

    try {
      const result = await parsePDFWithGemini(file, documentType);
      
      if (result.success) {
        setParsedData(prev => ({
          ...prev,
          [documentType]: result.data
        }));
        
        setProcessingStatus(prev => ({
          ...prev,
          [documentType]: { 
            status: 'success', 
            message: 'Document processed successfully!',
            summary: generateSummary(result.data, documentType)
          }
        }));
      } else {
        setProcessingStatus(prev => ({
          ...prev,
          [documentType]: { 
            status: 'error', 
            message: result.error || 'Failed to process document'
          }
        }));
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setProcessingStatus(prev => ({
        ...prev,
        [documentType]: { 
          status: 'error', 
          message: 'Error processing document'
        }
      }));
    }
  };

  const generateSummary = (data, documentType) => {
    if (!data) return '';
    
    switch (documentType) {
      case 'electricityBill':
        return `Electricity usage: ${data.consumption?.kwhUsed || 'N/A'} kWh, Amount: ${data.costs?.totalAmount || 'N/A'} ${data.costs?.currency || ''}`;
      case 'waterBill':
        return `Water usage: ${data.consumption?.waterUsed || 'N/A'} ${data.consumption?.unit || ''}, Amount: ${data.costs?.totalAmount || 'N/A'} ${data.costs?.currency || ''}`;
      case 'transportBill':
        return `Fuel: ${data.transportInfo?.quantity || 'N/A'} ${data.transportInfo?.unit || ''}, CO2: ${data.environmentalImpact?.estimatedCO2Emissions || 'N/A'} kg`;
      case 'numEmployees':
        return `Total employees: ${data.employeeMetrics?.totalEmployees || 'N/A'}`;
      case 'employeesHealth':
        return `Health coverage: ${data.healthBenefits?.bpjsKesehatan?.employeesCovered || 'N/A'} employees`;
      case 'communityEngagement':
        return `Programs: ${data.communityPrograms?.length || 0}, Beneficiaries: ${data.communityPrograms?.[0]?.beneficiaries || 'N/A'}`;
      default:
        return 'Document processed successfully';
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please log in to submit your ESG report');
        setProcessing(false);
        return;
      }

      console.log('Starting ESG report submission for user:', user.id);

      // Check if user has existing data
      const existingDataCheck = await userHasESGData(user.id);
      if (existingDataCheck.success && existingDataCheck.hasData) {
        const confirmReplace = window.confirm(
          `You have ${existingDataCheck.count} previous ESG submission(s). This new submission will become your latest result. Continue?`
        );
        if (!confirmReplace) {
          setProcessing(false);
          return;
        }
      }

      setProcessingStatus(prev => ({
        ...prev,
        general: { status: 'processing', message: 'Processing remaining documents...' }
      }));

      // Process any remaining files that haven't been processed
      const filesToProcess = {};
      Object.keys(form).forEach(key => {
        if (form[key] && form[key] instanceof File && !parsedData[key]) {
          filesToProcess[key] = form[key];
        }
      });

      console.log('Files to process:', Object.keys(filesToProcess));
      console.log('Already parsed data:', Object.keys(parsedData));

      const finalParsedData = { ...parsedData };
      if (Object.keys(filesToProcess).length > 0) {
        console.log('Processing remaining files...');
        const results = await processMultiplePDFs(filesToProcess);
        console.log('Processing results:', results);

        results.forEach(result => {
          if (result.success) {
            finalParsedData[result.documentType] = result.data;
          } else {
            console.error(`Failed to process ${result.documentType}:`, result.error);
          }
        });
      }

      console.log('Final parsed data:', finalParsedData);

      const submissionData = {
        basicInfo: {
          businessName: form.businessName,
          address: {
            alamat: form.alamat,
            kelurahan: form.kelurahan,
            kecamatan1: form.kecamatan1,
            kecamatan2: form.kecamatan2,
            kabupaten: form.kabupaten,
            provinsi: form.provinsi,
            kodePos: form.kodePos
          },
          contact: {
            email: form.email,
            phone: form.phone
          }
        },
        documentData: finalParsedData,
        submittedAt: new Date().toISOString()
      };

      console.log('Submission data prepared:', submissionData);

      setProcessingStatus(prev => ({
        ...prev,
        general: { status: 'processing', message: 'Saving document data...' }
      }));

      // Save to database using new service
      console.log('Saving to database...');
      const saveResult = await saveESGSubmission(user.id, submissionData);
      console.log('Save result:', saveResult);

      if (!saveResult.success) {
        throw new Error(`Database save failed: ${saveResult.error}`);
      }

      setProcessingStatus(prev => ({
        ...prev,
        general: { status: 'processing', message: 'Calculating ESG scores...' }
      }));

      // Calculate ESG scores from parsed data
      console.log('Calculating ESG scores...');
      const scoreResult = await calculateESGScore(finalParsedData, user.id);
      console.log('Score calculation result:', scoreResult);

      if (scoreResult.success) {
        // Save ESG scores using new service
        console.log('Saving ESG scores...');
        const saveScoreResult = await saveESGScores(user.id, saveResult.data.id, scoreResult.scores);
        console.log('Save score result:', saveScoreResult);

        if (saveScoreResult.success) {
          // Update user profile with latest ESG summary
          await updateUserESGProfile(user.id, scoreResult.scores);

          setProcessingStatus(prev => ({
            ...prev,
            general: {
              status: 'success',
              message: `ESG Analysis Complete! Your overall score: ${scoreResult.scores.overall}/100`,
              summary: `Environmental: ${scoreResult.scores.environmental} | Social: ${scoreResult.scores.social} | Governance: ${scoreResult.scores.governance}`
            }
          }));

          // Store scores for success page
          localStorage.setItem('latestESGScore', JSON.stringify(scoreResult.scores));
        } else {
          console.warn('Failed to save ESG scores:', saveScoreResult.error);
          setProcessingStatus(prev => ({
            ...prev,
            general: {
              status: 'success',
              message: 'Document data saved successfully! ESG scoring will be available shortly.'
            }
          }));
        }
      } else {
        console.warn('Failed to calculate ESG scores:', scoreResult.error);
        setProcessingStatus(prev => ({
          ...prev,
          general: {
            status: 'success',
            message: 'Document data saved successfully! ESG scoring will be available shortly.'
          }
        }));
      }

      console.log('ESG report submission completed successfully');
      setSubmitted(true);
      setTimeout(() => {
        navigate("/esg-results");
      }, 4000);

    } catch (error) {
      console.error('Full submission error:', error);
      console.error('Error stack:', error.stack);
      
      let errorMessage = 'Unknown error occurred';
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setProcessingStatus(prev => ({
        ...prev,
        general: { 
          status: 'error', 
          message: `Error: ${errorMessage}. Check console for details.`
        }
      }));
    } finally {
      setProcessing(false);
    }
  };

  const FileUploadSection = ({ name, label, required = false }) => (
    <div className="file-label-group">
      <label htmlFor={name}>{label} {required && '*'}</label>
      <div className="custom-file-input">
        <button type="button" onClick={() => document.getElementById(name).click()} className="file-btn">
          Upload File
        </button>
        <span className="file-name">{fileNames[name] || "No file chosen"}</span>
        <input id={name} name={name} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>
      
      {/* Processing Status */}
      {processingStatus[name] && (
        <div className={`processing-status ${processingStatus[name].status}`}>
          <div className="status-indicator">
            {processingStatus[name].status === 'processing' && <div className="spinner"></div>}
            {processingStatus[name].status === 'success' && <span className="success-icon">✅</span>}
            {processingStatus[name].status === 'error' && <span className="error-icon">❌</span>}
          </div>
          <div className="status-text">
            <div className="status-message">{processingStatus[name].message}</div>
            {processingStatus[name].summary && (
              <div className="status-summary">{processingStatus[name].summary}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="reportform-bg">
      <div className="reportform-card">
        <div className="reportform-container">
          <aside className="reportform-sidebar">
            <h2>Submit Your Report</h2>
            <div className="reportform-stepper">
              {steps.map((s, i) => (
                <div key={s.label} className={`stepper-step${i === step ? " active" : ""}`}
                  aria-current={i === step ? "step" : undefined}>
                  <div className={`stepper-circle${i === step ? " active" : ""}`}>{i + 1}</div>
                  <span className={`stepper-label${i === step ? " active" : ""}`}>{s.label}</span>
                  {i < steps.length - 1 && <div className="stepper-line"></div>}
                </div>
              ))}
            </div>
          </aside>
          <main className="reportform-main">
            {submitted ? (
              <div className="reportform-success-card">
                <div className="confetti">
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                </div>
                <div className="success-circle">
                  <span className="success-icon">✔️</span>
                </div>
                <h2 className="success-title">ESG Analysis Complete!</h2>
                
                {/* Show ESG Score if available */}
                {(() => {
                  const storedScore = localStorage.getItem('latestESGScore');
                  if (storedScore) {
                    const score = JSON.parse(storedScore);
                    return (
                      <div className="esg-score-summary">
                        <div className="overall-score">
                          <span className="score-label">Overall ESG Score</span>
                          <span className="score-value">{score.overall}/100</span>
                        </div>
                        <div className="score-breakdown">
                          <div className="score-item">
                            <span className="score-category">Environmental</span>
                            <span className="score-num">{score.environmental}</span>
                          </div>
                          <div className="score-item">
                            <span className="score-category">Social</span>
                            <span className="score-num">{score.social}</span>
                          </div>
                          <div className="score-item">
                            <span className="score-category">Governance</span>
                            <span className="score-num">{score.governance}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
                
                <p className="success-subtitle">
                  Your ESG report has been processed with AI analysis.<br/>
                  View detailed results and recommendations on the rating page.
                </p>
                <button className="success-btn" onClick={() => navigate("/esg-results")}>View Detailed Results</button>
              </div>
            ) : (
              <div className="reportform-steps-anim">
                {step === 0 && (
                  <form className="reportform-fields" aria-label="General Information">
                    <div className="section-title">General Information</div>
                    <div className="reportform-row">
                      <div className="floating-label-group wide">
                        <input name="businessName" value={form.businessName} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Business Name</label>
                      </div>
                    </div>
                    <div className="section-title">Address</div>
                    <div className="reportform-row">
                      <div className="floating-label-group">
                        <input name="alamat" value={form.alamat} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Alamat</label>
                      </div>
                      <div className="floating-label-group">
                        <input name="kelurahan" value={form.kelurahan} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Kelurahan</label>
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="floating-label-group">
                        <input name="kecamatan1" value={form.kecamatan1} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Kecamatan</label>
                      </div>
                      <div className="floating-label-group">
                        <input name="kecamatan2" value={form.kecamatan2} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Kecamatan</label>
                      </div>
                      <div className="floating-label-group">
                        <input name="kabupaten" value={form.kabupaten} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Kabupaten</label>
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="floating-label-group">
                        <input name="provinsi" value={form.provinsi} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Provinsi</label>
                      </div>
                      <div className="floating-label-group">
                        <input name="kodePos" value={form.kodePos} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Kode Pos</label>
                      </div>
                    </div>
                    <div className="section-title">Contact Details</div>
                    <div className="reportform-row">
                      <div className="floating-label-group">
                        <input name="email" value={form.email} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Email</label>
                      </div>
                      <div className="floating-label-group">
                        <input name="phone" value={form.phone} onChange={handleChange} required className="reportform-input" placeholder=" " />
                        <label>Phone Number</label>
                      </div>
                    </div>
                    <div className="reportform-actions">
                      <button type="button" className="reportform-next" onClick={nextStep} aria-label="Next Step">Next</button>
                    </div>
                  </form>
                )}
                {step === 1 && (
                  <form className="reportform-fields" aria-label="Environmental Information">
                    <div className="section-title">Environmental</div>
                    <p className="section-description">Upload your bills and documents. Our AI will analyze them automatically.</p>
                    
                    <div className="reportform-row">
                      <FileUploadSection name="electricityBill" label="Electricity Bill" required />
                    </div>
                    <div className="reportform-row">
                      <FileUploadSection name="waterBill" label="Water Bill" required />
                    </div>
                    <div className="reportform-row">
                      <div className="floating-label-group wide">
                        <input name="transportUse" value={form.transportUse} onChange={handleChange} className="reportform-input" placeholder=" " />
                        <label>Transport Use (Optional description)</label>
                      </div>
                    </div>
                    <div className="reportform-row">
                      <FileUploadSection name="transportBill" label="Transport/Fuel Bill" />
                    </div>
                    <div className="reportform-actions">
                      <button type="button" onClick={prevStep} className="reportform-back" aria-label="Previous Step">Back</button>
                      <button type="button" className="reportform-next" onClick={nextStep} aria-label="Next Step">Next</button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form className="reportform-fields" aria-label="Social Information">
                    <div className="section-title">Social</div>
                    <p className="section-description">Upload documents related to your workforce and community engagement.</p>
                    
                    <div className="reportform-row">
                      <FileUploadSection name="numEmployees" label="Number of Employees Document" required />
                      <FileUploadSection name="employeesHealth" label="Employees Health (BPJS/Insurance)" required />
                    </div>
                    <div className="reportform-row">
                      <FileUploadSection name="communityEngagement" label="Community Engagement Documentation" />
                    </div>
                    <div className="reportform-actions">
                      <button type="button" onClick={prevStep} className="reportform-back" aria-label="Previous Step">Back</button>
                      <button type="button" className="reportform-next" onClick={nextStep} aria-label="Next Step">Next</button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <form className="reportform-fields" aria-label="Governance Information" onSubmit={handleSubmit}>
                    <div className="section-title">Governance</div>
                    <p className="section-description">Upload your governance and compliance documents.</p>
                    
                    <div className="reportform-row">
                      <FileUploadSection name="ownershipStructure" label="Ownership Structure" required />
                      <FileUploadSection name="businessRegulation" label="Business Regulation/Licenses" required />
                    </div>
                    <div className="reportform-row">
                      <FileUploadSection name="taxCompliance" label="Tax Compliance" required />
                    </div>
                    
                    {/* Show processing status for general submission */}
                    {processingStatus.general && (
                      <div className={`processing-status ${processingStatus.general.status} wide`}>
                        <div className="status-indicator">
                          {processingStatus.general.status === 'processing' && <div className="spinner"></div>}
                        </div>
                        <div className="status-text">
                          <div className="status-message">{processingStatus.general.message}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="reportform-actions">
                      <button type="button" onClick={prevStep} className="reportform-back" aria-label="Previous Step">Back</button>
                      <button type="submit" className="reportform-next" disabled={processing} aria-label="Submit ESG Report">
                        {processing ? 'Processing...' : 'Submit & Analyze'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 