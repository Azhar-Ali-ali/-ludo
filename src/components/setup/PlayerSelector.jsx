import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayerSelector.css";

function PlayerSelector() {
  const navigate = useNavigate();

  const [playerCount, setPlayerCount] = useState(2);

  const handleStartGame = () => {
    navigate(`/game?players=${playerCount}`);
  };

  return (
    <section className="player-selector">
      {/* Heading */}
      <div className="player-heading">
        <h1>Choose Number of Players</h1>

        <p>
          Select how many players will participate in this match.
        </p>
      </div>

      {/* Player Cards */}
      <div className="player-cards">

        {/* 2 Players */}
        <div
          className={`player-card ${
            playerCount === 2 ? "selected-player-card" : ""
          }`}
          onClick={() => setPlayerCount(2)}
        >
          <div className="player-icon">
            👥
          </div>

          <h2>2 Players</h2>

          <p>
            You + 1 opponent. Quick and intense
            head-to-head match.
          </p>
        </div>

        {/* 3 Players */}
        <div
          className={`player-card ${
            playerCount === 3 ? "selected-player-card" : ""
          }`}
          onClick={() => setPlayerCount(3)}
        >
          <div className="player-icon">
            ⚡
          </div>

          <h2>3 Players</h2>

          <p>
            You + 2 opponents. A thrilling
            three-way tactical battle.
          </p>
        </div>

        {/* 4 Players */}
        <div
          className={`player-card ${
            playerCount === 4 ? "selected-player-card" : ""
          }`}
          onClick={() => setPlayerCount(4)}
        >
          <div className="player-icon">
            👑
          </div>

          <h2>4 Players</h2>

          <p>
            You + 3 opponents. The ultimate
            classic multiplayer experience.
          </p>
        </div>

      </div>

      {/* Start Game */}
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

export default PlayerSelector;