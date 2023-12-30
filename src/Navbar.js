// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/">
      <img src="./sectigo_s.png" alt="Sectigo" />
      </Link>

      {/* Navigation Links */}
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>

    
    </nav>
  );
};

export default Navbar;
