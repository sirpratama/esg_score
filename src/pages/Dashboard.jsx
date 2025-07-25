import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import heroImg from "../assets/hero.png";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { getUserLatestESGData, getUserESGStats } from "../services/esgDataService";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [esgStatus, setEsgStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchESGStatus(session.user.id);
      } else {
        setLoading(false);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchESGStatus(session.user.id);
      } else {
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchESGStatus = async (userId) => {
    try {
      const [latestData, stats] = await Promise.all([
        getUserLatestESGData(userId),
        getUserESGStats(userId)
      ]);
      
      setEsgStatus({
        latestData: latestData.success ? latestData.data : null,
        latestScores: latestData.success ? latestData.scores : null,
        stats: stats.success ? stats.data : null
      });
    } catch (error) {
      console.error('Error fetching ESG status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="dashboard-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="dashboard-overlay">
          <div className="dashboard-content">
            <div className="hero-headline">
              <span className="headline-main">Sustainability</span>
              <span className="headline-sub">Made Simple</span>
            </div>
            <div className="hero-tagline">
              Empowering UMKM businesses to achieve their ESG goals with intelligent scoring and actionable insights
            </div>
            {session && !loading && (
              <div className="auth-actions">
                {esgStatus?.latestScores ? (
                  <div className="esg-status-widget">
                    <h3>Your Latest ESG Score</h3>
                    <div className="score-display">
                      <div className="overall-score">
                        <span className="score-number">{esgStatus.latestScores.overall_score}</span>
                        <span className="score-label">/100</span>
                      </div>
                      <div className="score-categories">
                        <div className="category-mini">
                          <span className="category-label">E</span>
                          <span className="category-value">{esgStatus.latestScores.environmental_score}</span>
                        </div>
                        <div className="category-mini">
                          <span className="category-label">S</span>
                          <span className="category-value">{esgStatus.latestScores.social_score}</span>
                        </div>
                        <div className="category-mini">
                          <span className="category-label">G</span>
                          <span className="category-value">{esgStatus.latestScores.governance_score}</span>
                        </div>
                      </div>
                    </div>
                    <p className="esg-message">
                      {esgStatus.stats?.totalSubmissions > 1 
                        ? `You have ${esgStatus.stats.totalSubmissions} submissions. Ready to improve your score?`
                        : "Great start! Ready to submit a new report?"
                      }
                    </p>
                  </div>
                ) : (
                  <p>Welcome back! Ready to get your first ESG score?</p>
                )}
                <div className="dashboard-buttons">
                  <button onClick={() => navigate('/report')} className="cta-button">
                    {esgStatus?.latestScores ? 'Submit New Report' : 'Get Your ESG Score'}
                  </button>
                  {esgStatus?.latestScores && (
                    <button onClick={() => navigate('/esg-results')} className="secondary-button">
                      View Detailed Results
                    </button>
                  )}
                </div>
              </div>
            )}
            {!session && (
              <div className="hero-cta">
                <button className="cta-button primary" onClick={() => navigate('/register')}>Get Your ESG Score</button>
                <button className="cta-button secondary" onClick={() => navigate('/about')}>Learn More</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}