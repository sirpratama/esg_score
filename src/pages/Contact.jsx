import React, { useState } from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/forest.jpeg";

const contactMethods = [
  {
    title: "Email Us",
    icon: "📧",
    info: "hello@esgku.com",
    description: "Get in touch for general inquiries"
  },
  {
    title: "Call Us",
    icon: "📞",
    info: "+62 878 0957 0430",
    description: "Monday - Friday, 8AM - 9PM WIB"
  },
  {
    title: "Visit Us",
    icon: "📍",
    info: "Margonda Raya, Depok City",
    description: "West Java, Indonesia 16424"
  },
  {
    title: "Follow Us",
    icon: "🌐",
    info: "@esgku_indonesia",
    description: "Stay updated on social media"
  }
];

const faqs = [
  {
    question: "How accurate are your ESG ratings?",
    answer: "Our AI-powered system uses industry-standard ESG frameworks and is continuously updated with the latest sustainability metrics. We provide detailed breakdowns so you can understand exactly how your score is calculated."
  },
  {
    question: "How much does ESG assessment cost?",
    answer: "We offer various packages starting from affordable rates for small businesses. Our basic ESG assessment starts at just Rp 500,000, making sustainability accessible to all UMKM businesses."
  },
  {
    question: "How long does the assessment process take?",
    answer: "Most assessments are completed within 24-48 hours after you submit your information. Complex evaluations may take up to 5 business days."
  }
];

export default function Contact() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: '', email: '', company: '', phone: '', message: '', inquiryType: 'general' });
    }, 3000);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7f7f7' }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '300px',
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80px',
      }}>
        <div style={{ textAlign: 'center', color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>Get in Touch</h1>
          <p style={{
            fontSize: '1.3rem',
            fontWeight: '500',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            lineHeight: '1.5'
          }}>
            Ready to start your ESG journey? We're here to help you every step of the way
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {contactMethods.map((method, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {method.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#23401a',
                marginBottom: '0.5rem'
              }}>
                {method.title}
              </h3>
              <p style={{
                color: '#23401a',
                fontWeight: '600',
                marginBottom: '0.5rem',
                fontSize: '1.1rem'
              }}>
                {method.info}
              </p>
              <p style={{
                color: '#666',
                fontSize: '0.9rem'
              }}>
                {method.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form & FAQ Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Contact Form */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#23401a',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Send us a Message
            </h2>
            
            {isSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#e8f5e8',
                borderRadius: '12px',
                border: '2px solid #23401a'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: '#23401a', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: '#666' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem',
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="general">General Inquiry</option>
                  <option value="esg-rating">ESG Rating Service</option>
                  <option value="marketplace">UMKM Marketplace</option>
                  <option value="consulting">Sustainability Consulting</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us more about your inquiry...*"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #23401a 0%, #2e5a23 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    marginTop: '1rem'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#23401a',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  borderLeft: '4px solid #23401a'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#23401a',
                    marginBottom: '0.8rem'
                  }}>
                    {faq.question}
                  </h4>
                  <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #23401a 0%, #2e5a23 100%)',
              borderRadius: '12px',
              textAlign: 'center',
              color: '#fff'
            }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Still have questions?</h4>
              <p style={{ opacity: 0.9, marginBottom: '1rem' }}>Our team is here to help you get started</p>
              <button style={{
                background: '#fff',
                color: '#23401a',
                border: 'none',
                borderRadius: '8px',
                padding: '0.8rem 1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Schedule a Call
              </button>
            </div>
          </div>
        </div>

        {/* Map/Location Section */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#23401a',
            marginBottom: '1rem'
          }}>
            Visit Our Office
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Located in the heart of Depok City, we're easily accessible and always ready to welcome you
          </p>
          <div style={{
            background: '#f8f9fa',
            borderRadius: '16px',
            padding: '2rem',
            border: '2px dashed #23401a'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
            <h3 style={{ color: '#23401a', marginBottom: '0.5rem' }}>ESGku Headquarters</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Jl. Margonda Raya No. 123<br/>
              Depok City, West Java 16424<br/>
              Indonesia
            </p>
            <button style={{
              background: '#23401a',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.5rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
