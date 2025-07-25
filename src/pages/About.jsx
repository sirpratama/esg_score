import React from "react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#1d3314', color: '#fff' }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2vw 0 2vw' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1.5rem', marginTop: 0, textAlign: 'left' }}>About Us</h1>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2.5rem', lineHeight: 1.5, textAlign: 'left' }}>
          we believe that growth and responsibility go hand in hand. As a proud UMKM rooted in the heart of our community, we are committed to not just building a sustainable business—but to doing so in a way that positively impacts the environment, supports social progress, and upholds strong governance values.
        </div>
        <div style={{ display: 'flex', gap: '7.5rem', justifyContent: 'center', alignItems: 'stretch', marginTop: '4.5rem' }}>
          {/* Mission Card */}
          <div style={{
            background: '#22391a',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            flex: 1,
            minWidth: 320,
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            justifyContent: 'center',
          }}>
            <h2 style={{ color: '#e6f36a', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '1.2rem', textAlign: 'center' }}>Our Mission</h2>
            <div style={{ fontSize: '1.15rem', fontWeight: 500, color: '#fff', textAlign: 'left' }}>
              To empower local communities through innovative, sustainable practices that respect the planet, uplift people, and maintain transparency and accountability in every aspect of our work.
            </div>
          </div>
          {/* ESG Commitment Card */}
          <div style={{
            background: '#22391a',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            flex: 1,
            minWidth: 320,
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            justifyContent: 'center',
          }}>
            <h2 style={{ color: '#e6f36a', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '1.2rem', textAlign: 'center' }}>Our ESG Commitment</h2>
            <div style={{ fontSize: '1.15rem', fontWeight: 500, color: '#fff', textAlign: 'left' }}>
              We commit to help the environment which we specialize in UMKM. By building this we ensure that the UMKM in Indonesia will get more recognization and income.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
