import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg";

export default function Services() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f7f7' }}>
      <Navbar />
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '260px',
        background: `url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        marginTop: '80px',
      }}>
        <h1 style={{
          color: '#111',
          fontSize: '3rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          background: 'rgba(255,255,255,0.0)',
          padding: '0.5rem 2rem',
          borderRadius: '8px',
          borderBottom: '4px solid #111',
          textTransform: 'uppercase',
          textAlign: 'center',
          textDecoration: 'underline',
        }}>OUR SERVICES</h1>
      </div>
      {/* Cards Section */}
      <div style={{
        display: 'flex',
        gap: '3rem',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: '40px',
        flexWrap: 'wrap',
        zIndex: 2,
        position: 'relative',
      }}>
        {/* Card 1 */}
        <div style={{
          background: '#25491e',
          color: '#fff',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          minWidth: '350px',
          maxWidth: '420px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          justifyContent: 'center',
          height: '100%',
          minHeight: '320px',
        }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.2rem', textAlign: 'left' }}>Get ESG Rating</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 500 }}>
            Get professional ESG ratings for your sustainability reports. Our trained AI evaluates environmental, social, and governance performance using established rating methodologies.
          </p>
          <button style={{
            background: '#d3d3d3',
            color: '#111',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '6px',
            padding: '0.8rem 2rem',
            cursor: 'pointer',
            marginTop: 'auto',
          }}>Submit Your file Reports</button>
        </div>
        {/* Card 2 */}
        <div style={{
          background: '#25491e',
          color: '#fff',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          minWidth: '350px',
          maxWidth: '420px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          justifyContent: 'center',
          height: '100%',
          minHeight: '320px',
        }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.2rem', textAlign: 'left' }}>Promote UMKM</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 500 }}>
            We believe every Indonesian small business deserves recognition. That's why we showcase UMKM with transparent ESG ratings, making it easy for consumers to discover and support businesses that care about their community and environment."
          </p>
        </div>
      </div>
    </div>
  );
} 