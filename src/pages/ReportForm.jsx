import React, { useState } from "react";
import "./ReportForm.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

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
                <h2 className="success-title">Thank you!</h2>
                <p className="success-subtitle">Your ESG report has been submitted successfully.<br/>Redirecting to dashboard...</p>
                <button className="success-btn" onClick={() => navigate("/")}>Back to Dashboard</button>
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
                    <div className="reportform-row">
                      <div className="file-label-group">
                        <label htmlFor="electricityBill">Electricity Bill</label>
                        <input id="electricityBill" name="electricityBill" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="file-label-group">
                        <label htmlFor="waterBill">Water Bill</label>
                        <input id="waterBill" name="waterBill" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="floating-label-group wide">
                        <input name="transportUse" value={form.transportUse} onChange={handleChange} className="reportform-input" placeholder=" " />
                        <label>Transport Use</label>
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="file-label-group wide">
                        <label htmlFor="transportBill">Transport Bill</label>
                        <input id="transportBill" name="transportBill" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
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
                    <div className="reportform-row">
                      <div className="file-label-group">
                        <label htmlFor="numEmployees">Number of Employees</label>
                        <input id="numEmployees" name="numEmployees" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                      <div className="file-label-group">
                        <label htmlFor="employeesHealth">Employees Health (BPJS/Insurance)</label>
                        <input id="employeesHealth" name="employeesHealth" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="file-label-group wide">
                        <label htmlFor="communityEngagement">Community Engagement</label>
                        <input id="communityEngagement" name="communityEngagement" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
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
                    <div className="reportform-row">
                      <div className="file-label-group">
                        <label htmlFor="ownershipStructure">Ownership Structure</label>
                        <input id="ownershipStructure" name="ownershipStructure" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                      <div className="file-label-group">
                        <label htmlFor="businessRegulation">Business Regulation</label>
                        <input id="businessRegulation" name="businessRegulation" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                    </div>
                    <div className="reportform-row">
                      <div className="file-label-group wide">
                        <label htmlFor="taxCompliance">Tax Compliance</label>
                        <input id="taxCompliance" name="taxCompliance" type="file" onChange={handleChange} className="reportform-input" />
                      </div>
                    </div>
                    <div className="reportform-actions">
                      <button type="button" onClick={prevStep} className="reportform-back" aria-label="Previous Step">Back</button>
                      <button type="submit" className="reportform-next" aria-label="Submit ESG Report">Submit</button>
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