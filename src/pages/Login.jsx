import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../supabaseClient";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate('/');
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate('/');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  if (session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div>Welcome {session?.user?.email}! You are logged in!</div>
        <button onClick={signOut} style={{ marginTop: '1rem' }}>Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Left Section - Login Form */}
      <div style={{ 
        flex: 1, 
        background: '#f8f9fa', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '0 4rem',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '2rem', 
          left: '2rem', 
          color: '#6c757d', 
          fontSize: '0.9rem' 
        }}>
          LoginPage
        </div>
        
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Welcome Back!
          </h1>
          
          <p style={{ 
            color: '#666', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            do not have an account? <span style={{ color: '#23401a', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up now</span>
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #23401a',
                fontSize: '1rem',
                outline: 'none',
                background: '#fff'
              }}
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #23401a',
                fontSize: '1rem',
                outline: 'none',
                background: '#fff'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Remember me</span>
              </label>
              <span style={{ color: '#23401a', cursor: 'pointer', fontSize: '0.9rem' }}>
                Forgot Password
              </span>
            </div>

            <button
              type="submit"
              style={{
                background: '#23401a',
                color: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({ provider: 'google' });
              }}
              style={{
                background: '#fff',
                color: '#23401a',
                padding: '1rem',
                borderRadius: '8px',
                border: '1.5px solid #23401a',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {/* Google icon (optional) */}
              <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: 8 }}><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.19C12.13 13.13 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.99 37.36 46.1 31.45 46.1 24.55z"/><path fill="#FBBC05" d="M9.67 28.28c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.19C-1.13 17.18-1.13 30.82 1.69 39.09l7.98-6.19z"/><path fill="#EA4335" d="M24 46c6.18 0 11.64-2.36 15.85-6.45l-7.19-5.6c-2.01 1.35-4.57 2.15-8.66 2.15-6.43 0-11.87-3.63-13.33-8.59l-7.98 6.19C6.71 42.18 14.82 48 24 48z"/></g></svg>
              Login with Google
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #87CEEB 0%, #98FB98 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Simple landscape illustration */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Sky */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '60%', 
            background: '#87CEEB' 
          }} />
          
          {/* Trees */}
          <div style={{ 
            position: 'absolute', 
            bottom: '40%', 
            left: '20%', 
            width: '20px', 
            height: '80px', 
            background: '#8B4513' 
          }} />
          <div style={{ 
            position: 'absolute', 
            bottom: '45%', 
            left: '15%', 
            width: '30px', 
            height: '40px', 
            background: '#228B22', 
            borderRadius: '50% 50% 0 0' 
          }} />
          
          <div style={{ 
            position: 'absolute', 
            bottom: '40%', 
            left: '40%', 
            width: '20px', 
            height: '100px', 
            background: '#8B4513' 
          }} />
          <div style={{ 
            position: 'absolute', 
            bottom: '45%', 
            left: '35%', 
            width: '30px', 
            height: '50px', 
            background: '#228B22', 
            borderRadius: '50% 50% 0 0' 
          }} />
          
          <div style={{ 
            position: 'absolute', 
            bottom: '40%', 
            right: '30%', 
            width: '25px', 
            height: '120px', 
            background: '#8B4513' 
          }} />
          <div style={{ 
            position: 'absolute', 
            bottom: '45%', 
            right: '32%', 
            width: '40px', 
            height: '60px', 
            background: '#228B22', 
            borderRadius: '50% 50% 0 0' 
          }} />
          
          {/* Ground */}
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: '40%', 
            background: 'linear-gradient(to top, #556B2F, #8FBC8F)' 
          }} />
          
          {/* Path */}
          <div style={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '50%', 
            width: '4px', 
            height: '30%', 
            background: '#556B2F', 
            transform: 'translateX(-50%)',
            borderRadius: '2px'
          }} />
        </div>
      </div>
    </div>
  );
} 