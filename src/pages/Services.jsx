import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const services = [
  {
    title: "ESG Rating & Assessment",
    description: "Comprehensive ESG evaluation using AI-powered analysis of your sustainability reports, business practices, and environmental impact metrics.",
    features: [
      "Automated report analysis",
      "Industry-specific benchmarking", 
      "Detailed scoring breakdown",
      "Improvement recommendations"
    ],
    icon: "📊",
    buttonText: <Link to="/report">Get Your Rating</Link>
  },
  {
    title: "UMKM Marketplace",
    description: "Showcase your business to environmentally conscious consumers through our curated platform highlighting sustainable UMKM businesses.",
    features: [
      "Business profile optimization",
      "Customer discovery tools",
      "Transparency badges",
      "Marketing support"
    ],
    icon: "🏪",
    buttonText: null
  },
  {
    title: "Sustainability Consulting",
    description: "Expert guidance to help your business implement sustainable practices and improve your ESG performance over time.",
    features: [
      "Personalized action plans",
      "Implementation roadmaps",
      "Progress tracking",
      "Best practice recommendations"
    ],
    icon: "🌱",
    buttonText: null
  }
];

const processSteps = [
  {
    step: "01",
    title: "Submit Your Data",
    description: "Upload your business reports, sustainability documents, or fill out our comprehensive ESG questionnaire."
  },
  {
    step: "02", 
    title: "AI Analysis",
    description: "Our advanced AI system analyzes your data using industry-standard ESG frameworks and benchmarks."
  },
  {
    step: "03",
    title: "Get Your Score",
    description: "Receive detailed ESG ratings with breakdown by category and actionable improvement recommendations."
  },
  {
    step: "04",
    title: "Take Action",
    description: "Implement our recommendations and track your progress with ongoing monitoring and support."
  }
];

export default function Services() {
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
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f7f7' }}>
      <Navbar session={session} />
      
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '300px',
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImg}) center/cover no-repeat`,
        display: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        marginTop: '0px',
      }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>Our Services</h1>
          <p style={{
            fontSize: '1.3rem',
            fontWeight: '500',
            maxWidth: '600px',
            margin: '0 auto',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            Comprehensive ESG solutions to help Indonesian businesses thrive sustainably
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 2rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '80px'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              border: '1px solid #e0e0e0',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#23401a',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {service.title}
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                {service.description}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '2rem'
              }}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={{
                    padding: '0.5rem 0',
                    color: '#555',
                    fontSize: '0.95rem',
                    borderBottom: idx < service.features.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              {service.buttonText && (
                <button style={{
                  width: '100%',
                  background: '#23401a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#1c3415'}
                onMouseLeave={(e) => e.target.style.background = '#23401a'}>
                  {service.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '3rem 2rem',
          marginBottom: '60px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#23401a',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            How It Works
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {processSteps.map((step, index) => (
              <div key={index} style={{
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#23401a',
                  color: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  margin: '0 auto 1.5rem auto'
                }}>
                  {step.step}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#23401a',
                  marginBottom: '1rem'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '-1rem',
                    width: '2rem',
                    height: '2px',
                    background: '#e0e0e0',
                    display: window.innerWidth > 768 ? 'block' : 'none'
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #23401a 0%, #2e5a23 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Ready to Start Your ESG Journey?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Join hundreds of UMKM businesses already improving their sustainability practices with ESGku
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/report" className="cta-button primary">Get Started Now</Link>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#23401a';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#fff';
            }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 