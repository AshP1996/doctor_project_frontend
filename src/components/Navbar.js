import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-center">
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/doctor" onClick={() => setIsOpen(false)}>
            Doctor
          </Link>
          <Link to="/city" onClick={() => setIsOpen(false)}>
            City Specialization
          </Link>
          <Link to="/list" onClick={() => setIsOpen(false)}>
            List
          </Link>
          <Link to="/analytics" onClick={() => setIsOpen(false)}>
            Analytics
          </Link>
        </div>
      </div>
      <Link to="/doctor_form" className="navbar-login-link">
        <button className="navbar-login" onClick={() => setIsOpen(false)}>
          Sign Up / Login
        </button>
      </Link>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon"></span>
        <span className="navbar-toggle-icon"></span>
        <span className="navbar-toggle-icon"></span>
      </div>
    </nav>
  );
};

export default Navbar;
