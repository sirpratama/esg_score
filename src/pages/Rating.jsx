import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../../supabaseClient";
import bajuImg from "../assets/baju.png";
import heroImg from "../assets/forest.jpeg";

// Enhanced business data with more details
const items = [
  {
    title: "BAJU SUKSES",
    tag: "Fashion",
    score: 90,
    img: bajuImg,
    location: "Jakarta Selatan",
    employees: "15-25",
    established: "2018",
    description: "Sustainable fashion brand focusing on eco-friendly materials and fair trade practices.",
    highlights: ["Carbon Neutral", "Fair Trade", "Sustainable Materials"],
    esgBreakdown: { environmental: 92, social: 88, governance: 90 }
  },
  {
    title: "HIASAN INDAH",
    tag: "Home Goods",
    score: 86,
    img: bajuImg,
    location: "Bandung",
    employees: "8-15",
    established: "2020",
    description: "Handcrafted home decorations using recycled and upcycled materials.",
    highlights: ["Recycled Materials", "Local Artisans", "Zero Waste"],
    esgBreakdown: { environmental: 88, social: 85, governance: 85 }
  },
  {
    title: "MAGNET IPK",
    tag: "Home Goods",
    score: 70,
    img: bajuImg,
    location: "Surabaya",
    employees: "5-10",
    established: "2019",
    description: "Educational toy manufacturer promoting STEM learning with sustainable practices.",
    highlights: ["Educational Focus", "Safe Materials", "Local Sourcing"],
    esgBreakdown: { environmental: 68, social: 75, governance: 68 }
  },
  {
    title: "ANEKA SATAI",
    tag: "F&B",
    score: 89,
    img: bajuImg,
    location: "Yogyakarta",
    employees: "12-20",
    established: "2016",
    description: "Traditional Indonesian food with organic ingredients and waste reduction programs.",
    highlights: ["Organic Ingredients", "Waste Reduction", "Local Suppliers"],
    esgBreakdown: { environmental: 87, social: 92, governance: 88 }
  },
  {
    title: "MAKANAN SEHAT",
    tag: "F&B",
    score: 90,
    img: bajuImg,
    location: "Denpasar",
    employees: "20-30",
    established: "2017",
    description: "Healthy food delivery service with biodegradable packaging and local sourcing.",
    highlights: ["Biodegradable Packaging", "Healthy Options", "Community Support"],
    esgBreakdown: { environmental: 91, social: 89, governance: 90 }
  },
  {
    title: "TOKO LAMPU HIJAU",
    tag: "Home Goods",
    score: 85,
    img: bajuImg,
    location: "Medan",
    employees: "10-15",
    established: "2019",
    description: "Energy-efficient lighting solutions with solar-powered options.",
    highlights: ["Energy Efficient", "Solar Technology", "Repair Services"],
    esgBreakdown: { environmental: 88, social: 82, governance: 85 }
  },
  {
    title: "TOKO PAKU",
    tag: "Tools",
    score: 55,
    img: bajuImg,
    location: "Semarang",
    employees: "3-8",
    established: "2021",
    description: "Hardware store transitioning to sustainable practices and eco-friendly products.",
    highlights: ["Eco-friendly Products", "Recycling Program", "Local Partnerships"],
    esgBreakdown: { environmental: 52, social: 58, governance: 55 }
  },
  {
    title: "PAYUNG HUJAN NUSANTARA",
    tag: "Home Goods",
    score: 78,
    img: bajuImg,
    location: "Malang",
    employees: "6-12",
    established: "2020",
    description: "Weather protection gear made from recycled materials with local craftsmanship.",
    highlights: ["Recycled Materials", "Local Crafts", "Durable Design"],
    esgBreakdown: { environmental: 80, social: 76, governance: 78 }
  },
  {
    title: "PERI RAFI CATERING",
    tag: "F&B",
    score: 45,
    img: bajuImg,
    location: "Bogor",
    employees: "5-10",
    established: "2022",
    description: "Growing catering business implementing sustainable practices step by step.",
    highlights: ["Growing Sustainability", "Local Ingredients", "Community Events"],
    esgBreakdown: { environmental: 42, social: 48, governance: 45 }
  }
];

const tags = ["All", "F&B", "Fashion", "Home Goods", "Tools", "Electronics", "Beauty", "Services"];

const sortOptions = [
  { value: "score-desc", label: "Highest Score" },
  { value: "score-asc", label: "Lowest Score" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "newest", label: "Newest First" }
];

function getColor(score) {
  if (score >= 85) return "#4caf50";
  if (score >= 70) return "#8bc34a";
  if (score >= 55) return "#ffb74d";
  return "#f06292";
}

function getScoreLabel(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Fair";
  return "Needs Improvement";
}

export default function Rating() {
  const [session, setSession] = useState(null);
  const [latestScore, setLatestScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Try to get latest ESG score from localStorage
    const storedScore = localStorage.getItem('latestESGScore');
    if (storedScore) {
      try {
        setLatestScore(JSON.parse(storedScore));
      } catch (error) {
        console.error('Error parsing stored ESG score:', error);
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Navbar session={session} />
      <div style={{ paddingTop: '100px', textAlign: 'center', padding: '2rem' }}>
        <h1>ESG Rating Center</h1>
        
        {latestScore ? (
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '16px', 
            maxWidth: '600px', 
            margin: '2rem auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2>Your Latest ESG Score</h2>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#23401a', marginBottom: '1rem' }}>
              {latestScore.overall}/100
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#666' }}>Environmental</div>
                <div style={{ fontSize: '1.5rem', color: '#23401a' }}>{latestScore.environmental}</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#666' }}>Social</div>
                <div style={{ fontSize: '1.5rem', color: '#23401a' }}>{latestScore.social}</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', color: '#666' }}>Governance</div>
                <div style={{ fontSize: '1.5rem', color: '#23401a' }}>{latestScore.governance}</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/esg-results')}
              style={{
                background: '#23401a',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              View Detailed Analysis
            </button>
            <button 
              onClick={() => navigate('/report')}
              style={{
                background: 'transparent',
                color: '#23401a',
                padding: '1rem 2rem',
                border: '2px solid #23401a',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Submit New Report
            </button>
          </div>
        ) : (
          <div style={{ 
            background: 'white', 
            padding: '3rem', 
            borderRadius: '16px', 
            maxWidth: '600px', 
            margin: '2rem auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2>No ESG Rating Yet</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
              Submit your first ESG report to get your sustainability score and detailed analysis.
            </p>
            <button 
              onClick={() => navigate('/report')}
              style={{
                background: '#23401a',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Submit ESG Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
