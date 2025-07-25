import React, { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState(["All"]);
  const [sortBy, setSortBy] = useState("score-desc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Filter and sort logic
  const filtered = items
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTags.includes("All") || activeTags.includes(item.tag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score-desc":
          return b.score - a.score;
        case "score-asc":
          return a.score - b.score;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "newest":
          return b.established.localeCompare(a.established);
        default:
          return 0;
      }
    });

  const handleTagFilter = (tag) => {
    if (tag === "All") {
      setActiveTags(["All"]);
    } else {
      setActiveTags(prev => 
        prev.includes("All") 
          ? [tag]
          : prev.includes(tag) 
            ? prev.filter(t => t !== tag)
            : [...prev.filter(t => t !== "All"), tag]
      );
    }
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#f7f7f7" }}>
      
      {/* Hero Section */}
      <div style={{
        width: '100vw',
        height: '250px',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImg}) center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80px',
      }}>
        <div style={{ textAlign: 'center', color: '#fff', maxWidth: '800px', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>ESG Business Ratings</h1>
          <p style={{
            fontSize: '1.2rem',
            fontWeight: '500',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            lineHeight: '1.6'
          }}>
            Discover sustainable Indonesian UMKM businesses leading the way in environmental responsibility, social impact, and good governance
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 2rem" }}>
        
        {/* Enhanced Search and Filter Section */}
        <div style={{ 
          background: "#fff", 
          borderRadius: 24, 
          padding: "2rem", 
          marginBottom: 32,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          {/* Search Bar */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <input
              type="text"
              placeholder="Search businesses, locations, or descriptions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 50px 16px 20px",
                borderRadius: 16,
                border: "2px solid #e0e0e0",
                fontSize: 16,
                outline: "none",
                background: "#fff",
                color: "#333",
                transition: "border-color 0.3s ease"
              }}
            />
            <div style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "20px",
              color: "#666"
            }}>🔍</div>
          </div>

          {/* Filters and Controls */}
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "1rem", 
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            {/* Category Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
              {tags.map(tag => (
                <span
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  style={{
                    background: activeTags.includes(tag) ? "#23401a" : "#f5f5f5",
                    color: activeTags.includes(tag) ? "#fff" : "#666",
                    borderRadius: 20,
                    padding: "8px 16px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `2px solid ${activeTags.includes(tag) ? "#23401a" : "#e0e0e0"}`,
                    transition: "all 0.3s ease"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 12,
                  border: "2px solid #e0e0e0",
                  background: "#fff",
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: viewMode === "grid" ? "#23401a" : "#f5f5f5",
                    color: viewMode === "grid" ? "#fff" : "#666",
                    cursor: "pointer",
                    fontSize: 14
                  }}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: viewMode === "list" ? "#23401a" : "#f5f5f5",
                    color: viewMode === "list" ? "#fff" : "#666",
                    cursor: "pointer",
                    fontSize: 14
                  }}
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ 
            marginTop: "1rem", 
            padding: "0.5rem 0", 
            borderTop: "1px solid #e0e0e0",
            color: "#666",
            fontSize: 14
          }}>
            Showing {filtered.length} of {items.length} businesses
            {activeTags.length > 0 && !activeTags.includes("All") && (
              <span> in {activeTags.join(", ")}</span>
            )}
          </div>
        </div>

        {/* Business Cards Grid/List */}
        <div style={{
          display: viewMode === "grid" ? "grid" : "flex",
          flexDirection: viewMode === "list" ? "column" : undefined,
          gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fit, minmax(320px, 1fr))" : undefined,
          gap: viewMode === "grid" ? 24 : 16,
        }}>
          {filtered.map((item, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 20,
              padding: viewMode === "grid" ? "1.5rem" : "1.5rem 2rem",
              display: "flex",
              flexDirection: viewMode === "grid" ? "column" : "row",
              alignItems: viewMode === "grid" ? "center" : "flex-start",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #f0f0f0",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
            }}>
              
              {/* Business Image */}
              <img 
                src={item.img} 
                alt={item.title} 
                style={{ 
                  width: viewMode === "grid" ? "100%" : "120px",
                  height: viewMode === "grid" ? 200 : 120,
                  objectFit: "cover", 
                  borderRadius: 12, 
                  marginBottom: viewMode === "grid" ? 16 : 0,
                  marginRight: viewMode === "list" ? 20 : 0,
                  flexShrink: 0
                }} 
              />
              
              {/* Business Info */}
              <div style={{ 
                flex: 1,
                textAlign: viewMode === "grid" ? "center" : "left",
                width: "100%"
              }}>
                <div style={{ 
                  display: "flex", 
                  flexDirection: viewMode === "grid" ? "column" : "row",
                  alignItems: viewMode === "grid" ? "center" : "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "1rem"
                }}>
                  <div>
                    <h3 style={{ 
                      fontWeight: "bold", 
                      fontSize: "1.3rem", 
                      marginBottom: 8, 
                      color: "#23401a"
                    }}>
                      {item.title}
                    </h3>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, justifyContent: viewMode === "grid" ? "center" : "flex-start" }}>
                      <span style={{ 
                        background: "#f0f8f0", 
                        color: "#23401a", 
                        borderRadius: 12, 
                        padding: "4px 12px", 
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {item.tag}
                      </span>
                      <span style={{ 
                        background: "#f5f5f5", 
                        color: "#666", 
                        borderRadius: 12, 
                        padding: "4px 12px", 
                        fontSize: 12 
                      }}>
                        📍 {item.location}
                      </span>
                    </div>
                  </div>

                  {/* ESG Score Circle */}
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    flexDirection: "column",
                    marginLeft: viewMode === "list" ? "1rem" : 0,
                    marginTop: viewMode === "grid" ? "1rem" : 0
                  }}>
                    <svg width="80" height="80">
                      <circle cx="40" cy="40" r="35" stroke="#f0f0f0" strokeWidth="6" fill="none" />
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke={getColor(item.score)}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 35}
                        strokeDashoffset={2 * Math.PI * 35 * (1 - item.score / 100)}
                        style={{ transition: "stroke-dashoffset 0.5s ease" }}
                        strokeLinecap="round"
                      />
                      <text x="40" y="48" textAnchor="middle" fontSize="24" fontWeight="bold" fill={getColor(item.score)}>
                        {item.score}
                      </text>
                    </svg>
                    <span style={{ 
                      fontSize: 12, 
                      fontWeight: 600, 
                      color: getColor(item.score),
                      marginTop: 4
                    }}>
                      {getScoreLabel(item.score)}
                    </span>
                  </div>
                </div>

                {/* Business Description */}
                <p style={{ 
                  color: "#666", 
                  fontSize: "0.9rem", 
                  lineHeight: 1.5, 
                  marginBottom: "1rem"
                }}>
                  {item.description}
                </p>

                {/* Business Details */}
                <div style={{ 
                  display: "flex", 
                  gap: "1rem", 
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  color: "#888",
                  justifyContent: viewMode === "grid" ? "center" : "flex-start",
                  flexWrap: "wrap"
                }}>
                  <span>👥 {item.employees} employees</span>
                  <span>📅 Est. {item.established}</span>
                </div>

                {/* Highlights */}
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: 6, 
                  marginBottom: "1rem",
                  justifyContent: viewMode === "grid" ? "center" : "flex-start"
                }}>
                  {item.highlights.map((highlight, idx) => (
                    <span key={idx} style={{
                      background: "linear-gradient(135deg, #23401a 0%, #2e5a23 100%)",
                      color: "#fff",
                      fontSize: 10,
                      padding: "4px 8px",
                      borderRadius: 8,
                      fontWeight: 500
                    }}>
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* ESG Breakdown */}
                <div style={{ 
                  background: "#f8f9fa", 
                  borderRadius: 12, 
                  padding: "1rem",
                  marginTop: "1rem"
                }}>
                  <h4 style={{ 
                    fontSize: "0.9rem", 
                    fontWeight: 600, 
                    marginBottom: "0.5rem",
                    color: "#23401a"
                  }}>
                    ESG Breakdown
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {Object.entries(item.esgBreakdown).map(([key, value]) => (
                      <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ 
                          fontSize: "0.8rem", 
                          minWidth: "100px",
                          textTransform: "capitalize",
                          color: "#666"
                        }}>
                          {key}:
                        </span>
                        <div style={{ 
                          flex: 1, 
                          height: 6, 
                          background: "#e0e0e0", 
                          borderRadius: 3,
                          overflow: "hidden"
                        }}>
                          <div style={{
                            width: `${value}%`,
                            height: "100%",
                            background: getColor(value),
                            transition: "width 0.5s ease"
                          }} />
                        </div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: getColor(value) }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filtered.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "3rem",
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3 style={{ color: "#23401a", marginBottom: "0.5rem" }}>No businesses found</h3>
            <p style={{ color: "#666" }}>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
