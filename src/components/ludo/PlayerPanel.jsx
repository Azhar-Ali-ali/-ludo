import "./PlayerPanel.css";

function PlayerPanel({ players = [], currentPlayer }) {
  return (
    <div className="player-panel">
      {players.map((player) => (
        <div
          key={player.id}
          className={`player-card player-${player.color} ${
            currentPlayer === player.id ? "active-player" : ""
          }`}
        >
          <div className={`player-token player-token-${player.color}`}>
            {player.name.charAt(0).toUpperCase()}
          </div>

          <div className="player-info">
            <h3>{player.name}</h3>

            <p>
              {currentPlayer === player.id
                ? "Your Turn"
                : "Waiting"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlayerPanel;