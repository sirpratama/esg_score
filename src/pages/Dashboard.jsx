import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import heroImg from "../assets/hero.png";
import { supabase } from "../../supabaseClient";

export default function Dashboard() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

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
            <div className="hero-cta">
              <button className="cta-button primary" onClick={() => window.location.href = '/report'}>Get Your ESG Score</button>
              <button className="cta-button secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}