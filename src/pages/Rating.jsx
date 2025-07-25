import React, { useState } from "react";
import Navbar from "../components/Navbar";
import bajuImg from "../assets/baju.png";
// import hiasanImg from "../assets/hiasan.jpg";
// import magnetImg from "../assets/magnet.jpg";
// import sataiImg from "../assets/satai.jpg";
// import makananImg from "../assets/makanan.jpg";
// import lampuImg from "../assets/lampu.jpg";
// import pakuImg from "../assets/paku.jpg";
// import payungImg from "../assets/payung.jpg";
// import periImg from "../assets/peri.jpg";

// Placeholder data
const items = [
  {
    title: "BAJU SUKSES",
    tag: "Fashion",
    score: 90,
    img: bajuImg,
  },
  {
    title: "HIASAN INDAH",
    tag: "Home Goods",
    score: 86,
    img: bajuImg,
  },
  {
    title: "MAGNET IPK",
    tag: "Home Goods",
    score: 70,
    img: bajuImg,
  },
  {
    title: "ANEKA SATAI",
    tag: "F&B",
    score: 89,
    img: bajuImg,
  },
  {
    title: "MAKANAN",
    tag: "F&B",
    score: 90,
    img: bajuImg,
  },
  {
    title: "TOKO LAMPU",
    tag: "Home Goods",
    score: 85,
    img: bajuImg,
  },
  {
    title: "TOKO PAKU",
    tag: "Tools",
    score: 55,
    img: bajuImg,
  },
  {
    title: "PAYUNG HUJAN",
    tag: "Home Goods",
    score: 78,
    img: bajuImg,
  },
  {
    title: "PERI RAFI",
    tag: "F&B",
    score: 45,
    img: bajuImg,
  },
];

const tags = ["F&B", "Services", "Electronics", "Fashion", "Beauty", "Home Goods", "Tools"];

function getColor(score) {
  if (score >= 85) return "#4caf50";
  if (score >= 70) return "#8bc34a";
  if (score >= 55) return "#90caf9";
  return "#64b5f6";
}

export default function Rating() {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (activeTags.length === 0 || activeTags.includes(item.tag))
  );

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#f7f7f7", overflow: 'auto' }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: "40px auto 0 auto", padding: 0 }}>
        <div style={{ background: "#23401a", borderRadius: 20, padding: 32, marginBottom: 32 }}>
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 12,
              border: "none",
              fontSize: 20,
              marginBottom: 16,
              outline: "none",
              background: "#fff",
              color: "#222"
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map(tag => (
              <span
                key={tag}
                onClick={() => setActiveTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag])}
                style={{
                  background: activeTags.includes(tag) ? "#fff" : "#2e5a23",
                  color: activeTags.includes(tag) ? "#23401a" : "#fff",
                  borderRadius: 16,
                  padding: "4px 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "1px solid #2e5a23"
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
        }}>
          {filtered.map((item, i) => (
            <div key={i} style={{
              background: "#183415",
              borderRadius: 20,
              padding: 16,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            }}>
              <img src={item.img} alt={item.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />
              <div style={{ fontWeight: "bold", fontSize: 22, marginBottom: 8, textAlign: "center" }}>{item.title}</div>
              <span style={{ background: "#2e5a23", color: "#fff", borderRadius: 12, padding: "2px 12px", fontSize: 13, marginBottom: 16 }}>{item.tag}</span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <svg width="64" height="64">
                  <circle cx="32" cy="32" r="28" stroke="#333" strokeWidth="4" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={getColor(item.score)}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - item.score / 100)}
                    style={{ transition: "stroke-dashoffset 0.5s" }}
                  />
                  <text x="32" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{item.score}</text>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
