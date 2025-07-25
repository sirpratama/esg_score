import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Services from './pages/Services';
import About from './pages/About';
import Rating from './pages/Rating';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ReportForm  from './pages/ReportForm'
import ESGResults from './pages/ESGResults'

import './App.css'
import { supabase } from '../supabaseClient'
import { Import } from 'lucide-react'
import Navbar from './components/Navbar';

function App() {
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
    <Router>
      <Navbar session={session} /> {/* Pass session to Navbar */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path ="/profile" element= {<Profile/>} /> 
        <Route path = "/report" element = {<ReportForm/>} />
        <Route path = "/esg-results" element = {<ESGResults/>} />
      </Routes>
    </Router>
  );
}

export default App;