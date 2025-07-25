import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../../supabaseClient";
import { 
  getUserLatestESGData, 
  getUserESGHistory, 
  getUserESGStats,
  exportESGData,
  deleteESGSubmission 
} from "../services/esgDataService";
import "./ESGResults.css";

const ESGResults = () => {
  const [loading, setLoading] = useState(true);
  const [esgData, setEsgData] = useState(null);
  const [esgScores, setEsgScores] = useState(null);
  const [esgStats, setEsgStats] = useState(null);
  const [esgHistory, setEsgHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchESGData();
  }, []);

  const fetchESGData = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      setSession({ user });

      // Fetch latest ESG data using new service
      const latestDataResult = await getUserLatestESGData(user.id);
      
      if (latestDataResult.success) {
        setEsgData(latestDataResult.data);
        setEsgScores(latestDataResult.scores);
      } else {
        console.error('Error fetching latest ESG data:', latestDataResult.error);
      }

      // Fetch ESG statistics
      const statsResult = await getUserESGStats(user.id);
      if (statsResult.success) {
        setEsgStats(statsResult.data);
      }

      // Fetch ESG history
      const historyResult = await getUserESGHistory(user.id, 5);
      if (historyResult.success) {
        setEsgHistory(historyResult.data);
      }

    } catch (error) {
      console.error('Error fetching ESG data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const exportResult = await exportESGData(user.id, 'json');
      if (exportResult.success) {
        // Create download link
        const blob = new Blob([exportResult.data], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = exportResult.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return '#4caf50';
    if (score >= 70) return '#8bc34a';
    if (score >= 55) return '#ffb74d';
    return '#f44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Fair';
    return 'Needs Improvement';
  };

  const formatCurrency = (amount, currency = 'IDR') => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const EnvironmentalAnalysis = ({ data }) => {
    if (!data) return null;

    return (
      <div className="analysis-section">
        <h3>🌱 Environmental Analysis</h3>
        
        {data.electricityBill && (
          <div className="data-card">
            <h4>Electricity Consumption</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Monthly Usage</span>
                <span className="value">{data.electricityBill.consumption?.kwhUsed || 'N/A'} kWh</span>
              </div>
              <div className="data-item">
                <span className="label">Monthly Cost</span>
                <span className="value">{formatCurrency(data.electricityBill.costs?.totalAmount, data.electricityBill.costs?.currency)}</span>
              </div>
              <div className="data-item">
                <span className="label">Carbon Footprint</span>
                <span className="value">{data.electricityBill.carbonFootprint?.co2Emissions || 'N/A'} kg CO2</span>
              </div>
              <div className="data-item">
                <span className="label">Utility Company</span>
                <span className="value">{data.electricityBill.utilityCompany || 'N/A'}</span>
              </div>
            </div>
            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Based on your electricity usage of {data.electricityBill.consumption?.kwhUsed || 'N/A'} kWh, your business shows {data.electricityBill.consumption?.kwhUsed > 1000 ? 'high' : data.electricityBill.consumption?.kwhUsed > 500 ? 'moderate' : 'low'} energy consumption for a small business.</p>
            </div>
          </div>
        )}

        {data.waterBill && (
          <div className="data-card">
            <h4>Water Usage</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Monthly Usage</span>
                <span className="value">{data.waterBill.consumption?.waterUsed || 'N/A'} {data.waterBill.consumption?.unit || ''}</span>
              </div>
              <div className="data-item">
                <span className="label">Monthly Cost</span>
                <span className="value">{formatCurrency(data.waterBill.costs?.totalAmount, data.waterBill.costs?.currency)}</span>
              </div>
              <div className="data-item">
                <span className="label">Water Company</span>
                <span className="value">{data.waterBill.waterCompany || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Efficiency Rating</span>
                <span className="value">{data.waterBill.conservationMetrics?.efficiencyRating || 'N/A'}</span>
              </div>
            </div>
            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your water consumption patterns indicate {data.waterBill.consumption?.waterUsed > 100 ? 'high' : data.waterBill.consumption?.waterUsed > 50 ? 'moderate' : 'efficient'} usage. Consider implementing water-saving measures.</p>
            </div>
          </div>
        )}

        {data.transportBill && (
          <div className="data-card">
            <h4>Transportation & Emissions</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Fuel Type</span>
                <span className="value">{data.transportBill.transportInfo?.fuelType || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Fuel Quantity</span>
                <span className="value">{data.transportBill.transportInfo?.quantity || 'N/A'} {data.transportBill.transportInfo?.unit || ''}</span>
              </div>
              <div className="data-item">
                <span className="label">Transport Cost</span>
                <span className="value">{formatCurrency(data.transportBill.costs?.totalAmount, data.transportBill.costs?.currency)}</span>
              </div>
              <div className="data-item">
                <span className="label">CO2 Emissions</span>
                <span className="value">{data.transportBill.environmentalImpact?.estimatedCO2Emissions || 'N/A'} kg CO2</span>
              </div>
            </div>
            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your transportation emissions of {data.transportBill.environmentalImpact?.estimatedCO2Emissions || 'N/A'} kg CO2 suggest opportunities for green transportation alternatives.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SocialAnalysis = ({ data }) => {
    if (!data) return null;

    return (
      <div className="analysis-section">
        <h3>👥 Social Analysis</h3>
        
        {data.numEmployees && (
          <div className="data-card">
            <h4>Workforce Overview</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Total Employees</span>
                <span className="value">{data.numEmployees.employeeMetrics?.totalEmployees || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Full-time</span>
                <span className="value">{data.numEmployees.employeeMetrics?.fullTimeEmployees || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Part-time</span>
                <span className="value">{data.numEmployees.employeeMetrics?.partTimeEmployees || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Contract</span>
                <span className="value">{data.numEmployees.employeeMetrics?.contractEmployees || 'N/A'}</span>
              </div>
            </div>

            {data.numEmployees.demographics && (
              <div className="demographics">
                <h5>Demographics</h5>
                <div className="demo-grid">
                  <div className="demo-item">
                    <span>Male: {data.numEmployees.demographics.genderDistribution?.male || 0}</span>
                    <span>Female: {data.numEmployees.demographics.genderDistribution?.female || 0}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your workforce of {data.numEmployees.employeeMetrics?.totalEmployees || 'N/A'} employees indicates a {data.numEmployees.employeeMetrics?.totalEmployees > 50 ? 'large' : data.numEmployees.employeeMetrics?.totalEmployees > 20 ? 'medium' : 'small'} business scale with good employment contribution.</p>
            </div>
          </div>
        )}

        {data.employeesHealth && (
          <div className="data-card">
            <h4>Employee Health Benefits</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">BPJS Kesehatan</span>
                <span className="value">{data.employeesHealth.healthBenefits?.bpjsKesehatan?.covered ? '✅ Covered' : '❌ Not Covered'}</span>
              </div>
              <div className="data-item">
                <span className="label">BPJS Ketenagakerjaan</span>
                <span className="value">{data.employeesHealth.healthBenefits?.bpjsKetenagakerjaan?.covered ? '✅ Covered' : '❌ Not Covered'}</span>
              </div>
              <div className="data-item">
                <span className="label">Private Insurance</span>
                <span className="value">{data.employeesHealth.healthBenefits?.privateInsurance?.covered ? '✅ Available' : '❌ Not Available'}</span>
              </div>
              <div className="data-item">
                <span className="label">Healthcare Cost</span>
                <span className="value">{formatCurrency(data.employeesHealth.costs?.totalHealthcareCosts, data.employeesHealth.costs?.currency)}</span>
              </div>
            </div>
            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your health benefits coverage shows {data.employeesHealth.healthBenefits?.bpjsKesehatan?.covered ? 'good' : 'limited'} employee welfare support, indicating strong social responsibility.</p>
            </div>
          </div>
        )}

        {data.communityEngagement && (
          <div className="data-card">
            <h4>Community Engagement</h4>
            <div className="programs-list">
              {data.communityEngagement.communityPrograms?.map((program, index) => (
                <div key={index} className="program-item">
                  <h6>{program.programName}</h6>
                  <p>{program.description}</p>
                  <div className="program-stats">
                    <span>Beneficiaries: {program.beneficiaries || 'N/A'}</span>
                    <span>Investment: {formatCurrency(program.investmentAmount)}</span>
                  </div>
                </div>
              )) || <p>No community programs documented</p>}
            </div>
            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your community engagement with {data.communityEngagement.communityPrograms?.length || 0} programs demonstrates {data.communityEngagement.communityPrograms?.length > 2 ? 'strong' : data.communityEngagement.communityPrograms?.length > 0 ? 'moderate' : 'limited'} social impact initiatives.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const GovernanceAnalysis = ({ data }) => {
    if (!data) return null;

    return (
      <div className="analysis-section">
        <h3>🏛️ Governance Analysis</h3>
        
        {data.ownershipStructure && (
          <div className="data-card">
            <h4>Ownership Structure</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Legal Name</span>
                <span className="value">{data.ownershipStructure.companyInfo?.legalName || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Business Type</span>
                <span className="value">{data.ownershipStructure.corporateStructure?.businessType || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Registration Number</span>
                <span className="value">{data.ownershipStructure.companyInfo?.businessRegistrationNumber || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Incorporation Date</span>
                <span className="value">{data.ownershipStructure.companyInfo?.incorporationDate || 'N/A'}</span>
              </div>
            </div>

            {data.ownershipStructure.ownership && (
              <div className="ownership-breakdown">
                <h5>Ownership Breakdown</h5>
                {data.ownershipStructure.ownership.map((owner, index) => (
                  <div key={index} className="owner-item">
                    <span>{owner.ownerName}</span>
                    <span>{owner.ownershipPercentage}%</span>
                  </div>
                ))}
              </div>
            )}

            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your ownership structure shows {data.ownershipStructure.ownership?.length > 1 ? 'diverse' : 'concentrated'} ownership, indicating {data.ownershipStructure.ownership?.length > 1 ? 'good governance diversity' : 'centralized control'}.</p>
            </div>
          </div>
        )}

        {data.businessRegulation && (
          <div className="data-card">
            <h4>Regulatory Compliance</h4>
            <div className="licenses-grid">
              {data.businessRegulation.licenses?.map((license, index) => (
                <div key={index} className="license-item">
                  <div className="license-header">
                    <span className="license-type">{license.licenseType}</span>
                    <span className={`license-status ${license.status}`}>{license.status}</span>
                  </div>
                  <div className="license-details">
                    <p>Number: {license.licenseNumber}</p>
                    <p>Authority: {license.issuingAuthority}</p>
                    <p>Expires: {license.expiryDate}</p>
                  </div>
                </div>
              )) || <p>No licenses documented</p>}
            </div>

            {data.businessRegulation.certifications && (
              <div className="certifications">
                <h5>Certifications</h5>
                {data.businessRegulation.certifications.map((cert, index) => (
                  <div key={index} className="cert-item">
                    <span>{cert.certificationType}</span>
                    <span>{cert.certifyingBody}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your regulatory compliance shows {data.businessRegulation.licenses?.filter(l => l.status === 'active').length || 0} active licenses, indicating {data.businessRegulation.licenses?.length > 2 ? 'comprehensive' : 'basic'} regulatory adherence.</p>
            </div>
          </div>
        )}

        {data.taxCompliance && (
          <div className="data-card">
            <h4>Tax Compliance</h4>
            <div className="data-grid">
              <div className="data-item">
                <span className="label">Tax Year</span>
                <span className="value">{data.taxCompliance.taxYear || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Payment Status</span>
                <span className="value status-badge">{data.taxCompliance.taxPayments?.paymentStatus || 'N/A'}</span>
              </div>
              <div className="data-item">
                <span className="label">Total Tax Paid</span>
                <span className="value">{formatCurrency(data.taxCompliance.taxPayments?.totalTaxPaid, data.taxCompliance.taxPayments?.currency)}</span>
              </div>
              <div className="data-item">
                <span className="label">Compliance Rating</span>
                <span className="value">{data.taxCompliance.complianceRating || 'N/A'}</span>
              </div>
            </div>

            <div className="insights">
              <h5>💡 AI Insights</h5>
              <p>Your tax compliance status of "{data.taxCompliance.taxPayments?.paymentStatus || 'N/A'}" demonstrates {data.taxCompliance.taxPayments?.paymentStatus === 'current' ? 'excellent' : 'concerning'} fiscal responsibility.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const RecommendationsSection = ({ scores, data }) => {
    const recommendations = [];

    // Environmental recommendations
    if (scores?.environmental_score < 70) {
      if (data?.documentData?.electricityBill?.consumption?.kwhUsed > 1000) {
        recommendations.push({
          category: 'Environmental',
          priority: 'High',
          title: 'Reduce Energy Consumption',
          description: 'Your electricity usage is above average. Consider energy-efficient equipment and LED lighting.',
          impact: '+15 points'
        });
      }
      if (data?.documentData?.waterBill?.consumption?.waterUsed > 100) {
        recommendations.push({
          category: 'Environmental',
          priority: 'Medium',
          title: 'Implement Water Conservation',
          description: 'Install water-saving fixtures and monitor usage patterns.',
          impact: '+10 points'
        });
      }
    }

    // Social recommendations
    if (scores?.social_score < 70) {
      if (!data?.documentData?.employeesHealth?.healthBenefits?.bpjsKesehatan?.covered) {
        recommendations.push({
          category: 'Social',
          priority: 'High',
          title: 'Improve Health Benefits',
          description: 'Ensure all employees are covered by BPJS Kesehatan for better welfare.',
          impact: '+20 points'
        });
      }
      if (!data?.documentData?.communityEngagement?.communityPrograms?.length) {
        recommendations.push({
          category: 'Social',
          priority: 'Medium',
          title: 'Start Community Programs',
          description: 'Engage with local community through CSR initiatives.',
          impact: '+15 points'
        });
      }
    }

    // Governance recommendations
    if (scores?.governance_score < 70) {
      if (data?.documentData?.taxCompliance?.taxPayments?.paymentStatus !== 'current') {
        recommendations.push({
          category: 'Governance',
          priority: 'High',
          title: 'Improve Tax Compliance',
          description: 'Ensure all tax obligations are current and properly documented.',
          impact: '+25 points'
        });
      }
    }

    return (
      <div className="recommendations-section">
        <h3>🎯 AI-Generated Recommendations</h3>
        <p className="recommendations-intro">Based on your ESG analysis, here are personalized recommendations to improve your sustainability performance:</p>
        
        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div key={index} className={`recommendation-card priority-${rec.priority.toLowerCase()}`}>
              <div className="rec-header">
                <span className="rec-category">{rec.category}</span>
                <span className={`rec-priority priority-${rec.priority.toLowerCase()}`}>{rec.priority}</span>
              </div>
              <h4>{rec.title}</h4>
              <p>{rec.description}</p>
              <div className="rec-impact">
                <span>Potential Impact: {rec.impact}</span>
              </div>
            </div>
          ))}
          
          {recommendations.length === 0 && (
            <div className="no-recommendations">
              <h4>🎉 Excellent Performance!</h4>
              <p>Your ESG scores are strong across all categories. Continue maintaining these high standards and consider sharing your best practices with other businesses.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const StatisticsSection = ({ stats }) => {
    if (!stats) return null;

    return (
      <div className="statistics-section">
        <h3>📊 Your ESG Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalSubmissions}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.latestScore || 'N/A'}</div>
            <div className="stat-label">Latest Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.bestScore || 'N/A'}</div>
            <div className="stat-label">Best Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.averageScore || 'N/A'}</div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>
        {stats.lastSubmission && (
          <p className="last-submission">
            Last submission: {new Date(stats.lastSubmission).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        )}
      </div>
    );
  };

  const HistorySection = ({ history, showHistory, setShowHistory }) => {
    if (!history || history.length === 0) return null;

    return (
      <div className="history-section">
        <div className="history-header">
          <h3>📈 Submission History</h3>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="toggle-history-btn"
          >
            {showHistory ? 'Hide History' : `Show History (${history.length})`}
          </button>
        </div>
        
        {showHistory && (
          <div className="history-list">
            {history.map((submission, index) => (
              <div key={submission.id} className="history-item">
                <div className="history-header-item">
                  <div className="submission-date">
                    {new Date(submission.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  {submission.esg_scores && submission.esg_scores[0] && (
                    <div className="submission-score">
                      Score: {submission.esg_scores[0].overall_score}/100
                    </div>
                  )}
                </div>
                <div className="submission-details">
                  Business: {submission.parsed_data?.basicInfo?.businessName || 'N/A'}
                </div>
                {submission.esg_scores && submission.esg_scores[0] && (
                  <div className="score-breakdown-mini">
                    <span>E: {submission.esg_scores[0].environmental_score}</span>
                    <span>S: {submission.esg_scores[0].social_score}</span>
                    <span>G: {submission.esg_scores[0].governance_score}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Navbar session={session} />
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading your ESG analysis...</p>
        </div>
      </div>
    );
  }

  if (!esgData) {
    return (
      <div className="no-data-container">
        <Navbar session={session} />
        <div className="no-data-content">
          <h2>No ESG Data Found</h2>
          <p>You haven't submitted an ESG report yet.</p>
          <button onClick={() => navigate('/report')} className="cta-button">Submit ESG Report</button>
        </div>
      </div>
    );
  }

  return (
    <div className="esg-results-page">
      <Navbar session={session} />
      
      {/* Header Section */}
      <div className="results-header">
        <div className="header-content">
          <h1>ESG Analysis Results</h1>
          <p>Comprehensive AI analysis of your sustainability performance</p>
          <div className="submission-date">
            Report submitted: {new Date(esgData.created_at).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Score Overview */}
      {esgScores && (
        <div className="scores-overview">
          <div className="score-card overall">
            <div className="score-circle">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="#e0e0e0" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={getScoreColor(esgScores.overall_score)}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 * (1 - esgScores.overall_score / 100)}
                  strokeLinecap="round"
                />
                <text x="60" y="68" textAnchor="middle" fontSize="28" fontWeight="bold" fill={getScoreColor(esgScores.overall_score)}>
                  {esgScores.overall_score}
                </text>
              </svg>
            </div>
            <div className="score-info">
              <h3>Overall ESG Score</h3>
              <p className="score-label">{getScoreLabel(esgScores.overall_score)}</p>
            </div>
          </div>

          <div className="category-scores">
            <div className="category-score environmental">
              <h4>Environmental</h4>
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${esgScores.environmental_score}%`, backgroundColor: getScoreColor(esgScores.environmental_score) }}
                ></div>
              </div>
              <span className="score-number">{esgScores.environmental_score}/100</span>
            </div>
            
            <div className="category-score social">
              <h4>Social</h4>
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${esgScores.social_score}%`, backgroundColor: getScoreColor(esgScores.social_score) }}
                ></div>
              </div>
              <span className="score-number">{esgScores.social_score}/100</span>
            </div>
            
            <div className="category-score governance">
              <h4>Governance</h4>
              <div className="score-bar">
                <div 
                  className="score-fill" 
                  style={{ width: `${esgScores.governance_score}%`, backgroundColor: getScoreColor(esgScores.governance_score) }}
                ></div>
              </div>
              <span className="score-number">{esgScores.governance_score}/100</span>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <StatisticsSection stats={esgStats} />

      {/* History Section */}
      <HistorySection 
        history={esgHistory} 
        showHistory={showHistory} 
        setShowHistory={setShowHistory} 
      />

      {/* Detailed Analysis */}
      <div className="detailed-analysis">
        <EnvironmentalAnalysis data={esgData?.parsed_data?.documentData} />
        <SocialAnalysis data={esgData?.parsed_data?.documentData} />
        <GovernanceAnalysis data={esgData?.parsed_data?.documentData} />
      </div>

      {/* Recommendations */}
      <RecommendationsSection scores={esgScores} data={esgData?.parsed_data} />

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={() => navigate('/report')} className="btn-secondary">
          Submit New Report
        </button>
        <button onClick={handleExportData} className="btn-secondary">
          Export Data
        </button>
        <button onClick={() => window.print()} className="btn-primary">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ESGResults; 