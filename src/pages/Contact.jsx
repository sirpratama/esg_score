import React, { useState } from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission (e.g., send email or show a message)
    alert('Message sent!');
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f7f7' }}>
      <Navbar />
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '220px',
        background: `url(${heroImg}) center/cover no-repeat`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '0px',
      }}>
        <div style={{
          background: 'rgba(34, 60, 22, 0.7)',
          width: '100vw',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          marginLeft: '7vw',
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: '2.8rem',
            fontWeight: 'bold',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: 1,
          }}>
            Get to know<br />with us
          </h1>
        </div>
      </div>
      {/* Main Section */}
      <div style={{
        background: '#25491e',
        width: '100vw',
        minHeight: 'calc(100vh - 220px - 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0 3rem 0',
      }}>
        <h2 style={{
          color: '#fff',
          fontSize: '2.7rem',
          fontWeight: 'bold',
          margin: '2rem 0 2.5rem 0',
          textAlign: 'center',
        }}>
          Contact Us
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '3rem',
          width: '100%',
          maxWidth: '1100px',
        }}>
          {/* Contact Details */}
          <div style={{ flex: 1, color: '#fff', fontSize: '1.5rem', minWidth: 260, marginLeft: '0vw', textAlign: 'left' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: 24 }}>Contact Details</h3>
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontWeight: 'bold'}}>Location</span><br />
              Depok City, Margonda,
            </div>
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontWeight: 'bold' }}>Business Hours</span><br />
              Monday - Friday 8am - 9pm
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Call Us</span><br />
              +62 878 0957 0430
            </div>
          </div>
          {/* Email Form */}
          <div style={{
            flex: 1,
            background: '#fff',
            borderRadius: 8,
            padding: '2.5rem 2rem',
            minWidth: 320,
            maxWidth: 420,
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h3 style={{ color: '#25491e', fontWeight: 'bold', fontSize: '1.3rem', marginBottom: 24, textAlign: 'center' }}>Send us an Email</h3>
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #25491e',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#fff',
                  color: '#25491e',
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #25491e',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#fff',
                  color: '#25491e',
                }}
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #25491e',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#fff',
                  color: '#25491e',
                  resize: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#25491e',
                  color: '#fff',
                  padding: '0.7rem 2.5rem',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  alignSelf: 'center',
                }}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
