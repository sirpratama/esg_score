import React from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Navbar.css";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ session }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar${isAuthPage ? " navbar-white" : ""}`}>
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src="src/assets/logo.png" className="logo" style={{ width: '200px', height: 'auto' }}/>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">HOME</Link>
        <Link to="/about" className="italic">ABOUT</Link>
        <Link to="/service">SERVICE</Link>
        <Link to="/rating">RATING</Link>
        {session && <Link to="/esg-results">MY RESULTS</Link>}
        <Link to="/contact" className="italic">CONTACT</Link>
        {!session ? (
          <>
            <Link to="/login" className="btn login-btn">LOGIN</Link>
            <Link to="/register" className="btn signup-btn">SIGN UP</Link>
          </>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <div className="profile-avatar" onClick={() => setDropdownOpen((v) => !v)}>
              {/* Simple SVG avatar */}
              <svg height="36" width="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#fff" />
                <circle cx="18" cy="14" r="7" fill="#23401a" />
                <ellipse cx="18" cy="27" rx="10" ry="6" fill="#23401a" />
              </svg>
            </div>
            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="profile-avatar-large">
                  <svg height="40" width="40" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="18" fill="#bdbd00" />
                    <circle cx="18" cy="14" r="7" fill="#23401a" />
                    <ellipse cx="18" cy="27" rx="10" ry="6" fill="#23401a" />
                  </svg>
                </div>
                <div className="profile-info">
                  <div className="profile-business"><b>Business name</b></div>
                  <div className="profile-email">{session.user.email}</div>
                </div>
                <div className="profile-actions">
                  <Link to="/profile" className="profile-action">Edit Profile</Link>
                  <button className="profile-action signout" onClick={handleSignOut}>Signout</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}