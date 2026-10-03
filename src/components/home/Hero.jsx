import "./Hero.css";
function Hero({onPlay}) {
  return (
    <section className="hero"
  >
      <div className="hero-content">

        <div className="hero-text">
          <span className="hero-badge">
             THE CLASSIC GAME, REIMAGINED
          </span>

          <h1>
            Play Ludo.
            <br />
            <span>Your Way.</span>
          </h1>

          <p className="hero-description">
            Experience classic Ludo with friends, challenge the computer,
            or compete with players online. Roll the dice, make your move,
            capture your opponents, and race your tokens home.
          </p>

          <div className="hero-actions">
             <button
    className="primary-button dice-btn"
    onClick={onPlay}
  >
    <span className="pip top-left"></span>
    <span className="pip bottom-right"></span>
    <span className="btn-text">Play Now</span>
  </button>

            <button className="secondary-button dice-btn">
              <span className="pip top-left"></span>
              <span className="pip center"></span>
              <span className="pip bottom-right"></span>
              <span className="btn-text">How to Play</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>2–4</strong>
              <span>Players</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>3</strong>
              <span>Game Modes</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>∞</strong>
              <span>Fun</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="game-card">
            <div className="mini-board-container">
              <img
                src="https://i.pinimg.com/1200x/06/0a/9e/060a9e012b114b7858452e01b3c89924.jpg"
                alt="Real Ludo Board In Play"
                className="mini-board-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;