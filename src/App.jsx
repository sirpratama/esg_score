import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Services from './pages/Services'
import About from './pages/About'
import Rating from './pages/Rating'
import Register from './pages/Register'
import './App.css'
import { supabase } from '../supabaseClient'

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
      </Routes>
    </Router>
  )
}

export default App