import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/b80967dd-0bf1-4c3b-bea7-36ae9f2c1e36_removalai_preview.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="gamer-header">
      <div className="header-container">
        
        {/* Logo / Brand */}
        <div className="header-logo">
          <div className="logo-icon">
            <img className="logopic" src={logo} alt="LUDO Logo" />
          </div>
          <span className="logo-text">LUDO<span className="logo-dot">.</span></span>
        </div>

        {/* Navigation Links */}
        <nav className={`header-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <a href="#home" className="nav-link active">Home</a>
          <a href="#how-to-play" className="nav-link">How to Play</a>
          <a href="#game-modes" className="nav-link">Game Modes</a>
          <a href="#leaderboard" className="nav-link">Leaderboard</a>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
  <Link to="/login" className="login-btn">
    Login
  </Link>

  <Link to="/signup" className="signup-btn">
    Sign Up
  </Link>
</div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;