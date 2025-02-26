import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header-navbar">
      <a href="/" className="logo-navbar">
        Logo
      </a>
      <nav className="navbar">
        <a href="/">Home</a>

        {/* Dropdown Menu */}
        <div
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <a href="#" className="dropbtn">
            Report
          </a>
          {isDropdownOpen && (
            <ul className="dropdown-content">
              <li>
                <a href="/report-lost-item">Lost Item</a>
              </li>
              <li>
                <a href="/report-found-item">Found Item</a>
              </li>
            </ul>
          )}
        </div>

        <a href="/">Browse</a>
        <a href="/">My Reports</a>
        <a href="/">LogOut</a>
      </nav>
    </header>
  );
};

export default Navbar;
