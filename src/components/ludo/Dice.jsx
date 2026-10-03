import { useState } from "react";
import "./Dice.css";

function Dice({ onRoll, disabled = false }) {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  // Handle rolling the dice
  const handleRollClick = () => {
    if (disabled || isRolling) return;

    setIsRolling(true);

    // Simulate rolling animation delay
    setTimeout(() => {
      const rolledNumber = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolledNumber);
      setIsRolling(false);

      // Send the rolled value up to the parent component (Game.jsx)
      if (typeof onRoll === "function") {
        onRoll(rolledNumber);
      }
    }, 400);
  };

  // Helper to render the correct number of pips based on the dice value (1-6)
  const renderDicePips = (value) => {
    const pips = [];
    // We render up to 9 grid spaces for pip placement layout
    for (let i = 1; i <= 9; i++) {
      let hasPip = false;

      if (value === 1 && i === 5) hasPip = true;
      if (value === 2 && (i === 1 || i === 9)) hasPip = true;
      if (value === 3 && (i === 1 || i === 5 || i === 9)) hasPip = true;
      if (value === 4 && (i === 1 || i === 3 || i === 7 || i === 9)) hasPip = true;
      if (value === 5 && (i === 1 || i === 3 || i === 5 || i === 7 || i === 9)) hasPip = true;
      if (value === 6 && (i === 1 || i === 3 || i === 4 || i === 6 || i === 7 || i === 9)) hasPip = true;

      pips.push(
        <div key={i} className={`pip-slot ${hasPip ? "active" : ""}`} />
      );
    }
    return pips;
  };

  return (
    <div className="dice-component-wrapper">
      {/* Visual Dice Face */}
      <div 
        className={`dice-face ${isRolling ? "rolling" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleRollClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Dice showing value ${diceValue}`}
      >
        <div className="dice-grid">
          {renderDicePips(diceValue)}
        </div>
      </div>

      {/* Roll Action Button */}
      <button 
        className="roll-dice-btn" 
        onClick={handleRollClick} 
        disabled={disabled || isRolling}
      >
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
}

export default Dice;