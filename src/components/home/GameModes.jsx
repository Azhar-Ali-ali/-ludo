import "./GameModes.css";

function GameModes() {
  return (
    <section className="game-modes">
      <div className="game-modes-container">

        <div className="game-modes-heading">
          <span className="section-label">
            CHOOSE YOUR GAME
          </span>

          <h2>
            Play the way
            <br />
            <span>you want.</span>
          </h2>

          <p>
            Whether you're playing with friends, challenging the
            computer, or competing online, there's a game mode for you.
          </p>
        </div>

        <div className="game-mode-grid">

          <article className="game-mode-card">
            <div className="game-mode-icon">
              👥
            </div>

            <div className="game-mode-content">
              <span className="game-mode-number">
                01
              </span>

              <h3>Local Multiplayer</h3>

              <p>
                Gather your friends and enjoy a classic Ludo match
                together on the same device.
              </p>

              <button className="mode-button">
                Play Local
                <span>→</span>
              </button>
            </div>
          </article>

          <article className="game-mode-card">
            <div className="game-mode-icon">
              🤖
            </div>

            <div className="game-mode-content">
              <span className="game-mode-number">
                02
              </span>

              <h3>VS Computer</h3>

              <p>
                Test your strategy against the computer and see
                whether you can make it home first.
              </p>

              <button className="mode-button">
                Play VS AI
                <span>→</span>
              </button>
            </div>
          </article>

          <article className="game-mode-card">
            <div className="game-mode-icon">
              🌐
            </div>

            <div className="game-mode-content">
              <span className="game-mode-number">
                03
              </span>

              <h3>Online Multiplayer</h3>

              <p>
                Create a room, invite your friends, and compete in
                real-time from anywhere.
              </p>

              <button className="mode-button">
                Play Online
                <span>→</span>
              </button>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
}

export default GameModes;