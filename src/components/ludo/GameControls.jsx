import { useState } from "react";
import "./GameControls.css";

function GameControls({
  onNewGame,
  onRestart,
  onSoundToggle,
  onHowToPlay,
  onExit,
  soundEnabled = true
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to handle closing the menu when an action is clicked
  const handleAction = (actionCallback) => {
    if (typeof actionCallback === "function") {
      actionCallback();
    }
    setIsOpen(false); // Close menu on selection
  };

  return (
    <div className="game-controls-wrapper">
      {/* Menu Trigger Button */}
      <button 
        className="menu-trigger-btn" 
        onClick={toggleMenu}
        aria-label="Toggle Game Menu"
      >
        <span className="menu-icon-bar"></span>
        <span className="menu-icon-bar"></span>
        <span className="menu-icon-bar"></span>
        <span className="menu-trigger-text">Menu</span>
      </button>

      {/* Popup Menu Overlay Container */}
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="game-controls-container" onClick={(e) => e.stopPropagation()}>
            <div className="controls-header">
              <h3>Game Menu</h3>
              <button className="close-menu-btn" onClick={() => setIsOpen(false)}>&times;</button>
            </div>

            <div className="controls-buttons-grid">
              {/* New Game Button */}
              <button className="control-btn" onClick={() => handleAction(onNewGame)}>
                <span className="control-icon" aria-hidden="true">🔄</span>
                <span className="control-text">New Game</span>
              </button>

              {/* Restart Match Button */}
              <button className="control-btn" onClick={() => handleAction(onRestart)}>
                <span className="control-icon" aria-hidden="true">⟳</span>
                <span className="control-text">Restart</span>
              </button>

              {/* Sound Toggle Button */}
              <button className="control-btn" onClick={() => { if (onSoundToggle) onSoundToggle(); }}>
                <span className="control-icon" aria-hidden="true">
                  {soundEnabled ? "🔊" : "🔇"}
                </span>
                <span className="control-text">
                  Sound: {soundEnabled ? "ON" : "OFF"}
                </span>
              </button>

              {/* How to Play Rules Button */}
              <button className="control-btn" onClick={() => handleAction(onHowToPlay)}>
                <span className="control-icon" aria-hidden="true">❓</span>
                <span className="control-text">How to Play</span>
              </button>

              {/* Exit Game Button */}
              <button className="control-btn exit-btn" onClick={() => handleAction(onExit)}>
                <span className="control-icon" aria-hidden="true">←</span>
                <span className="control-text">Exit Game</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameControls;