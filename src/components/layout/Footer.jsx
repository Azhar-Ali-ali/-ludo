import "./Footer.css";

function Footer() {
  return (
    <footer className="gamer-footer">
      <div className="footer-container">
        
        {/* Brand & About */}
        <div className="footer-col about-col">
          <div className="footer-logo">
            <span className="logo-text">LUDO<span className="logo-dot">.</span></span>
          </div>
          <p className="footer-desc">
            The classic board game, reimagined for modern gamers. Roll the dice, race your tokens, and claim victory with friends online or offline.
          </p>
          <div className="footer-socials">
            <a href="#facebook" aria-label="Facebook" className="social-icon">🌐</a>
            <a href="#twitter" aria-label="Twitter" className="social-icon">💬</a>
            <a href="#discord" aria-label="Discord" className="social-icon">🎮</a>
            <a href="#instagram" aria-label="Instagram" className="social-icon">📸</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#how-to-play">How to Play</a></li>
            <li><a href="#game-modes">Game Modes</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-col newsletter-col">
          <h3>Stay Updated</h3>
          <p>Subscribe to get updates on new tournaments, modes, and features.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="newsletter-btn">Join</button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LUDO. All rights reserved. Built for gamers.</p>
      </div>
    </footer>
  );
}

export default Footer;