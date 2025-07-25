import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Sarah Wijaya",
    role: "CEO & Founder",
    description: "Environmental engineer with 8+ years experience in sustainability consulting for Indonesian businesses.",
    icon: "👩‍💼"
  },
  {
    name: "Ahmad Rahman",
    role: "CTO",
    description: "AI specialist focused on developing innovative solutions for ESG assessment and environmental impact analysis.",
    icon: "👨‍💻"
  },
  {
    name: "Maya Sari",
    role: "Head of UMKM Relations",
    description: "Former small business owner who understands the unique challenges and opportunities facing Indonesian UMKM.",
    icon: "🤝"
  }
];

const values = [
  {
    title: "Transparency",
    description: "We believe in open, honest communication and clear ESG reporting standards.",
    icon: "🔍"
  },
  {
    title: "Empowerment",
    description: "Supporting UMKM businesses with tools and knowledge to succeed sustainably.",
    icon: "💪"
  },
  {
    title: "Innovation",
    description: "Using cutting-edge AI technology to make ESG assessment accessible to all.",
    icon: "🚀"
  },
  {
    title: "Community",
    description: "Building a network of environmentally conscious businesses across Indonesia.",
    icon: "🌍"
  }
];

export default function About() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f7f7' }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '350px',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80px',
      }}>
        <div style={{ textAlign: 'center', color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>About ESGku</h1>
          <p style={{
            fontSize: '1.4rem',
            fontWeight: '500',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            lineHeight: '1.6'
          }}>
            Empowering Indonesian UMKM businesses to thrive through sustainable practices and transparent ESG reporting
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        
        {/* Story Section */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#23401a',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>Our Story</h2>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#555',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            marginBottom: '2rem'
          }}>
            ESGku was born from a simple belief: every Indonesian business, no matter how small, deserves the opportunity to contribute to a sustainable future. As we witnessed the growing importance of Environmental, Social, and Governance (ESG) practices, we realized that many UMKM businesses were being left behind due to complex reporting requirements and expensive consultation fees.
          </p>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#555',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Today, we're proud to be Indonesia's leading platform for accessible ESG assessment, helping hundreds of small and medium businesses measure, improve, and showcase their sustainability efforts to conscious consumers and investors.
          </p>
        </div>

        {/* Mission & Vision */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #23401a 0%, #2e5a23 100%)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            color: '#fff',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎯</div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#bdbd00'
            }}>Our Mission</h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              opacity: 0.95
            }}>
              To democratize ESG assessment for Indonesian UMKM businesses, providing accessible tools, transparent scoring, and actionable insights that drive sustainable growth and positive environmental impact.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #23401a 0%, #2e5a23 100%)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            color: '#fff',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔮</div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#bdbd00'
            }}>Our Vision</h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              opacity: 0.95
            }}>
              To become the catalyst for Indonesia's sustainable economy, where every UMKM business operates with environmental consciousness, social responsibility, and transparent governance as core values.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#23401a',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>Our Values</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {values.map((value, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '1.5rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {value.icon}
                </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#23401a',
                  marginBottom: '1rem'
                }}>
                  {value.title}
                </h4>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '4rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#23401a',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>Meet Our Team</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '16px',
                background: '#f8f9fa',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  {member.icon}
                </div>
                <h4 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#23401a',
                  marginBottom: '0.5rem'
                }}>
                  {member.name}
                </h4>
                <p style={{
                  color: '#bdbd00',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  fontSize: '1.1rem'
                }}>
                  {member.role}
                </p>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
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
            Ready to Join Our Mission?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Whether you're a UMKM business looking to improve your sustainability practices or an investor seeking responsible business partners, we're here to help.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/report" className="cta-button primary">Get Your ESG Score</Link>
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
              <Link to="/contact">Contact Us</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
