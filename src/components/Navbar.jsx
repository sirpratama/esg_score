import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Navbar.css";

export default function Navbar({ session }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Dashboard</div>
      <div className="navbar-links">
        <Link to="/">HOME</Link>
        <Link to="/about" className="italic">ABOUT</Link>
        <Link to="/service">SERVICE</Link>
        <Link to="/rating">RATING</Link>
        <Link to="/contact" className="italic">CONTACT</Link>
        {!session ? (
          <>
            <Link to="/login" className="btn login-btn">LOGIN</Link>
            <Link to="/register" className="btn signup-btn">SIGN UP</Link>
          </>
        ) : (
          <>
            <span style={{ color: "#fff", marginLeft: "1rem" }}>{session.user.email}</span>
            <button className="btn login-btn" onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}