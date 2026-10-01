import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Logging in with:", email, password);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        {/* Close Button */}
        <button
          className="close-btn"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <div className="auth-header">
          <h2>
            Welcome Back, <span className="highlight">Player!</span>
          </h2>

          <p>
            Enter the arena and continue your Ludo journey.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="gamer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Login to Play
          </button>

        </form>

        <div className="auth-switch">
          <p>
            Don't have an account?{" "}

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;