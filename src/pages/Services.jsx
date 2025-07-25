import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg";

export default function Services() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#f7f7f7' }}>
      <Navbar />
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '35vh',
        background: `url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        marginTop: '80px', // to offset navbar
      }}>
        <h1 style={{
          color: '#111',
          fontSize: '3rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          background: 'rgba(255,255,255,0.7)',
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
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '260px', // less tall
        marginTop: '40px', // more gap
        flexWrap: 'wrap',
        zIndex: 2,
        position: 'relative',
      }}>
        {/* Card 1 */}
        <div style={{
          background: '#183415',
          color: '#fff',
          borderRadius: '20px',
          padding: '1.5rem 1.2rem', // more compact
          minWidth: '260px',
          maxWidth: '320px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          justifyContent: 'center',
          height: '100%',
        }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '0.7rem' }}>Get ESG Rating</h2>
          <p style={{ marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.5 }}>
            Get professional ESG ratings for your sustainability reports. Our trained AI chatbot evaluates environmental, social, and governance performance using established rating methodologies.
          </p>
          <button style={{
            background: '#d3d3d3',
            color: '#111',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            padding: '0.6rem 1.2rem',
            cursor: 'pointer',
            marginTop: 'auto',
          }}>Submit Your file Reports</button>
        </div>
        {/* Card 2 */}
        <div style={{
          background: '#183415',
          color: '#fff',
          borderRadius: '20px',
          padding: '1.5rem 1.2rem', // more compact
          minWidth: '260px',
          maxWidth: '320px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          justifyContent: 'center',
          height: '100%',
        }}>
          {/* Add your second service content here */}
        </div>
      </div>
    </div>
  );
} 