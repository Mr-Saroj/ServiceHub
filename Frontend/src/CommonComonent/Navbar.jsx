import React, { useState } from "react";
import "./Navbar.css";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // Close menu on mobile after click
  };

  return (
    <div>
      <header className="sh-header">
        <div className="container header-container">
          <NavLink to="/" className="logo" onClick={handleLinkClick}>
            <i className="fas fa-tools"></i>
            ServiceHub
          </NavLink>

          <button
            className="mobile-menu-toggle"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>

          <nav className={menuOpen ? "active" : ""}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    "btn btn-outline " + (isActive ? "active-link" : "")
                  }
                  onClick={handleLinkClick}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Navbar;
