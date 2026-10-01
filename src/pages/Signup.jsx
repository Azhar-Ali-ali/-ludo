import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signing up with:", username, email, password);
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
            Create Your <span className="highlight">Account</span>
          </h2>

          <p>
            Join thousands of players rolling the dice daily.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="DiceMaster99"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Create Account
          </button>

        </form>

        <div className="auth-switch">
          <p>
            Already have an account?{" "}

            <Link to="/login" className="login-btn">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;