import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Portfolio
        </Link>
        <div className="social-icons">
          <a href="https://github.com/coutshoko" target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/coutshoko/" target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 