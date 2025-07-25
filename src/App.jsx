import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Services from './pages/Services'
import About from './pages/About'
import Rating from './pages/Rating'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Profile from './pages/Profile';
import ReportForm  from './pages/ReportForm'

import './App.css'
import { supabase } from '../supabaseClient'
import { Import } from 'lucide-react'

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App