import React from 'react';
import './Footer.css'; // Optional if you want separate styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} FormulaHub. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/your-username/formulaHub" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

