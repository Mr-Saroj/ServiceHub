import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="sh-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About ServiceHub</h3>
            <p>
              Connecting customers with trusted local service providers since 2023.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">How It Works</a></li>
              <li><a href="/">Become a Technician</a></li>
              <li><a href="/">Pricing</a></li>
              <li><a href="/">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> 123 Main Street</li>
              <li><i className="fas fa-phone"></i> (123) 456-7890</li>
              <li><i className="fas fa-envelope"></i> info@servicehub.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 ServiceHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
