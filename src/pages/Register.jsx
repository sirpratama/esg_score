import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Register() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // You can add phone/businessName to user metadata if needed
    const { error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-8) // Placeholder, you should add a password field for real use
    });
    if (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Left Section - Register Form */}
      <div style={{
        flex: 1,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 4rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: '#bdbdbd',
          fontSize: '0.9rem'
        }}>
          LoginPage
        </div>
        <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 'bold', color: '#111', marginBottom: '1rem', textAlign: 'center' }}>Sign Up</h1>
          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            style={{
              padding: '1rem',
              borderRadius: '16px',
              border: '1.5px solid #23401a',
              fontSize: '1rem',
              outline: 'none',
              background: '#fff',
              color: '#23401a'
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '1rem',
              borderRadius: '16px',
              border: '1.5px solid #23401a',
              fontSize: '1rem',
              outline: 'none',
              background: '#fff',
              color: '#23401a'
            }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{
              padding: '1rem',
              borderRadius: '16px',
              border: '1.5px solid #23401a',
              fontSize: '1rem',
              outline: 'none',
              background: '#fff',
              color: '#23401a'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#23401a',
              color: '#fff',
              padding: '1rem',
              borderRadius: '16px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem',
              marginBottom: '0.5rem'
            }}
          >
            Create an Account
          </button>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signInWithOAuth({ provider: 'google' });
            }}
            style={{
              background: '#23401a',
              color: '#fff',
              padding: '1rem',
              borderRadius: '16px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            Sign In with GOOGLE
            <svg width="28" height="28" viewBox="0 0 48 48" style={{ marginLeft: 8 }}><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.19C12.13 13.13 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.99 37.36 46.1 31.45 46.1 24.55z"/><path fill="#FBBC05" d="M9.67 28.28c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.19C-1.13 17.18-1.13 30.82 1.69 39.09l7.98-6.19z"/><path fill="#EA4335" d="M24 46c6.18 0 11.64-2.36 15.85-6.45l-7.19-5.6c-2.01 1.35-4.57 2.15-8.66 2.15-6.43 0-11.87-3.63-13.33-8.59l-7.98 6.19C6.71 42.18 14.82 48 24 48z"/></g></svg>
          </button>
        </form>
      </div>
      {/* Right Section - Illustration */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #e3f3fc 0%, #d6f5e3 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Simple landscape illustration (reuse from Login) */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Sky */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: '#e3f3fc'
          }} />
          {/* Trees */}
          <div style={{
            position: 'absolute',
            bottom: '40%',
            left: '20%',
            width: '20px',
            height: '80px',
            background: '#23401a'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '45%',
            left: '15%',
            width: '30px',
            height: '40px',
            background: '#23401a',
            borderRadius: '50% 50% 0 0'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '40%',
            left: '40%',
            width: '20px',
            height: '100px',
            background: '#23401a'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '45%',
            left: '35%',
            width: '30px',
            height: '50px',
            background: '#23401a',
            borderRadius: '50% 50% 0 0'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '40%',
            right: '30%',
            width: '25px',
            height: '120px',
            background: '#23401a'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '45%',
            right: '32%',
            width: '40px',
            height: '60px',
            background: '#23401a',
            borderRadius: '50% 50% 0 0'
          }} />
          {/* Ground */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, #23401a, #4e7c4e)'
          }} />
          {/* Path */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            width: '4px',
            height: '30%',
            background: '#23401a',
            transform: 'translateX(-50%)',
            borderRadius: '2px'
          }} />
        </div>
      </div>
    </div>
  );
} 