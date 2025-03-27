import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileReportOpen, setIsMobileReportOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close report dropdown when main menu is toggled
    setIsMobileReportOpen(false);
  };

  const toggleMobileReport = () => {
    setIsMobileReportOpen(!isMobileReportOpen);
  };

  return (
    <header className="header-navbar">
      <Link to="/" className="logo-navbar">
        Lost & Found
      </Link>

      {/* Mobile Menu Toggle */}
      <div 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/home" className="nav-link" onClick={toggleMobileMenu}>Home</Link>

        {/* Dropdown Menu */}
        <div 
          className={`dropdown ${isMobileReportOpen ? 'mobile-active' : ''}`}
        >
          <span 
            className="dropbtn" 
            onClick={toggleMobileReport}
          >
            Report
          </span>
          <ul className="dropdown-content">
            <li>
              <Link 
                to="/report-lost-item" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Lost Item
              </Link>
            </li>
            <li>
              <Link 
                to="/report-found-item" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Found Item
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/browse" className="nav-link" onClick={toggleMobileMenu}>Browse</Link>
        <Link to="/my-reports" className="nav-link" onClick={toggleMobileMenu}>My Reports</Link>
        <Link to="/logout" className="nav-link" onClick={toggleMobileMenu}>Log Out</Link>
      </nav>
    </header>
  );
};

export default Navbar;