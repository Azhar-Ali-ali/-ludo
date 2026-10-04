import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ComputerSetup() {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("medium");

  const handleStartGame = () => {
    navigate(`/game?mode=computer&difficulty=${difficulty}`);
  };

  return (
    <section className="player-selector">
      <div className="player-heading">
        <h1>Play vs Computer</h1>

        <p>
          Choose your difficulty level before starting the game.
        </p>
      </div>

      <div className="player-cards">

        {/* Easy */}
        <div
          className={`player-card ${
            difficulty === "easy"
              ? "selected-player-card"
              : ""
          }`}
          onClick={() => setDifficulty("easy")}
        >
          <div className="player-icon">🙂</div>

          <h2>Easy</h2>

          <p>
            A relaxed game where the computer makes
            simple decisions.
          </p>
        </div>

        {/* Medium */}
        <div
          className={`player-card ${
            difficulty === "medium"
              ? "selected-player-card"
              : ""
          }`}
          onClick={() => setDifficulty("medium")}
        >
          <div className="player-icon">⚔️</div>

          <h2>Medium</h2>

          <p>
            The computer makes smarter moves and
            looks for opportunities to capture.
          </p>
        </div>

        {/* Hard */}
        <div
          className={`player-card ${
            difficulty === "hard"
              ? "selected-player-card"
              : ""
          }`}
          onClick={() => setDifficulty("hard")}
        >
          <div className="player-icon">👑</div>

          <h2>Hard</h2>

          <p>
            A challenging opponent that makes
            strategic decisions.
          </p>
        </div>

      </div>

      <div className="player-actions">
        <button
          className="start-game-btn"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </section>
  );
}

export default ComputerSetup;