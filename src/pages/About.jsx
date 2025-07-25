import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg"; // Use a mountain image for the hero section

export default function About() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f7f7', color: '#111' }}>
      <Navbar />
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '35vh',
        background: `url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 0,
        padding: '0 0 0 4vw',
        marginTop: '80px', // to offset navbar
      }}>
        <h1 style={{
          color: '#111',
          fontSize: '2.7rem',
          fontWeight: 'bold',
          fontStyle: 'italic',
          marginBottom: '0.5rem',
        }}>Who are we</h1>
        <span style={{ fontSize: '1.2rem', color: '#111', marginBottom: 0 }}>We are sigmas</span>
      </div>
      {/* Mission and Values Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2vw',
        padding: '3vw 4vw',
        color: '#111',
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '2rem', marginBottom: '1rem', color: '#111' }}>Our Mission:</h2>
          <div style={{
            background: '#e5e5e5',
            borderRadius: '20px',
            padding: '2rem',
            minHeight: '180px',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: '#111',
          }}>
            <div style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '1rem', color: 'black' }}>Mission:</div>
            <div style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#111' }}>Vision:</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '2rem', marginBottom: '1rem', color: '#111' }}>Our Values:</h2>
          <div style={{
            background: '#e5e5e5',
            borderRadius: '20px',
            padding: '2rem',
            minHeight: '180px',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: '#111',
          }}>
            {/* Add values content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
