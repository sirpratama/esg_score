import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../../supabaseClient";

export default function Rating() {
  const [session, setSession] = useState(null);
  const [latestScore, setLatestScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Try to get latest ESG score from localStorage
    const storedScore = localStorage.getItem('latestESGScore');
    if (storedScore) {
      try {
        setLatestScore(JSON.parse(storedScore));
      } catch (error) {
        console.error('Error parsing stored ESG score:', error);
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Navbar session={session} />
      <div style={{ paddingTop: '100px', textAlign: 'center', padding: '2rem' }}>
        <h1>ESG Rating Center</h1>
        
        {latestScore ? (
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '16px', 
            maxWidth: '600px', 
            margin: '2rem auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2>Your Latest ESG Score</h2>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#23401a', marginBottom: '1rem' }}>
              {latestScore.overall}/100
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#666' }}>Environmental</div>
                <div style={{ fontSize: '1.5rem', color: '#23401a' }}>{latestScore.environmental}</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#666' }}>Social</div>
                <div style={{ fontSize: '1.5rem', color: '#23401a' }}>{latestScore.social}</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#666' }}>Governance</div>
                <div style={{ fontSize: '1.5rem', color: '#23401a' }}>{latestScore.governance}</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/esg-results')}
              style={{
                background: '#23401a',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              View Detailed Analysis
            </button>
            <button 
              onClick={() => navigate('/report')}
              style={{
                background: 'transparent',
                color: '#23401a',
                padding: '1rem 2rem',
                border: '2px solid #23401a',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Submit New Report
            </button>
          </div>
        ) : (
          <div style={{ 
            background: 'white', 
            padding: '3rem', 
            borderRadius: '16px', 
            maxWidth: '600px', 
            margin: '2rem auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2>No ESG Rating Yet</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
              Submit your first ESG report to get your sustainability score and detailed analysis.
            </p>
            <button 
              onClick={() => navigate('/report')}
              style={{
                background: '#23401a',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Submit ESG Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
