import "./TurnIndicator.css";

function TurnIndicator({ currentPlayer = "Player 1", playerColor = "red" }) {
  // Map player color strings to color-coded symbols or display names
  const colorMap = {
    red: { name: "Red", symbol: "🔴" },
    green: { name: "Green", symbol: "🟢" },
    yellow: { name: "Yellow", symbol: "🟡" },
    blue: { name: "Blue", symbol: "🔵" },
  };

  const normalizedColor = playerColor.toLowerCase();
  const colorInfo = colorMap[normalizedColor] || { name: playerColor, symbol: "🎲" };

  return (
    <div className="turn-indicator-container">
      <span className="turn-label">Current Turn</span>
      <div className="turn-player-info">
        <span className="player-name">{currentPlayer}</span>
        <span className={`player-color-badge ${normalizedColor}`}>
          <span className="color-symbol" aria-hidden="true">{colorInfo.symbol}</span>
          <span className="color-text">{colorInfo.name}</span>
        </span>
      </div>
    </div>
  );
}

export default TurnIndicator;