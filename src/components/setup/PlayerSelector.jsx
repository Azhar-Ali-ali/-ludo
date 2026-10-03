import { useNavigate } from "react-router-dom";
import "./PlayerSelector.css";

function PlayerSelector() {
    const navigate = useNavigate();
  return (
    <section className="player-selector">
      {/* Heading Area */}
      <div className="player-heading">
        <h1>Choose Number of Players</h1>
        <p>Select how many players will participate in this match.</p>
      </div>

      {/* Player Count Cards Container */}
      <div className="player-cards">
        {/* Card 1: 2 Players */}
        <div className="player-card">
          <div className="player-icon">👥</div>
          <h2>2 Players</h2>
          <p>You + 1 opponent. Quick and intense head-to-head match.</p>
        </div>

        {/* Card 2: 3 Players */}
        <div className="player-card">
          <div className="player-icon">⚡</div>
          <h2>3 Players</h2>
          <p>You + 2 opponents. A thrilling three-way tactical battle.</p>
        </div>

        {/* Card 3: 4 Players */}
        <div className="player-card">
          <div className="player-icon">👑</div>
          <h2>4 Players</h2>
          <p>You + 3 opponents. The ultimate classic multiplayer experience.</p>
        </div>
      </div>

      {/* Start Game Action Button */}
      <div className="player-actions">
       <button
  className="start-game-btn"
  onClick={() => navigate("/game")}
>
  Start Game
</button>
      </div>
    </section>
  );
}

export default PlayerSelector;