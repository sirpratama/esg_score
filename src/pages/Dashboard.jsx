import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
      <Navbar session={session} />
      <div className="dashboard-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="dashboard-overlay">
          <div className="dashboard-content">
            <div className="esg-title">
              <span className="esg-bold">ESG</span>
              <span className="esg-ku">ku</span>
            </div>
            <div className="esg-subtitle">
              Helping UMKM’s reach their goal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}