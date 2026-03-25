import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleLinkClick = () => {
    setMenuOpen(false);
    setLoading(true);
  };

  // Hide loader after page change
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {loading && (
        <div className="page-loader">
          <div className="loader"></div>
        </div>
      )}

      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={handleLinkClick}>
            <i className="fas fa-tools"></i> ServiceHub
          </NavLink>

          <button
            className="navbar-toggle"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>

          <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? "nav-btn active" : "nav-btn"
                  }
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