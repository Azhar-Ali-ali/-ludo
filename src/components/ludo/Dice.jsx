import { useEffect, useRef, useState } from "react";
import "./Dice.css";

function Dice({
  onRoll,
  disabled = false,

  // Used by computer
  computerRoll = null,
  computerRollKey = 0,
}) {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // ============================================
  // HUMAN ROLL
  // ============================================

  const handleRollClick = () => {
    if (disabled || isRolling) return;

    startRoll();
  };

  // ============================================
  // START VISUAL DICE ROLL
  // ============================================

  const startRoll = (finalValue = null, notifyParent = true) => {
    if (isRolling) return;

    setIsRolling(true);

    let rollCount = 0;

    // Rapidly change dice faces
    intervalRef.current = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;

      setDiceValue(randomNumber);

      rollCount++;

      // After several random faces
      if (rollCount >= 8) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        const finalNumber =
          finalValue !== null
            ? finalValue
            : Math.floor(Math.random() * 6) + 1;

        // Small delay before showing final face
        timeoutRef.current = setTimeout(() => {
          setDiceValue(finalNumber);
          setIsRolling(false);

          // Only tell Game.jsx for human rolls
          if (notifyParent && typeof onRoll === "function") {
            onRoll(finalNumber);
          }
        }, 100);

      }
    }, 100);
  };

  // ============================================
  // COMPUTER ROLL
  // ============================================

  useEffect(() => {
    if (computerRollKey === 0) return;
    if (computerRoll === null) return;

    // Computer uses EXACT SAME visual roll
    startRoll(computerRoll, false);

  }, [computerRollKey]);

  // ============================================
  // CLEANUP
  // ============================================

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ============================================
  // DICE PIPS
  // ============================================

  const renderDicePips = (value) => {
    const pips = [];

    for (let i = 1; i <= 9; i++) {
      let hasPip = false;

      if (value === 1 && i === 5) {
        hasPip = true;
      }

      if (value === 2 && (i === 1 || i === 9)) {
        hasPip = true;
      }

      if (
        value === 3 &&
        (i === 1 || i === 5 || i === 9)
      ) {
        hasPip = true;
      }

      if (
        value === 4 &&
        (i === 1 ||
          i === 3 ||
          i === 7 ||
          i === 9)
      ) {
        hasPip = true;
      }

      if (
        value === 5 &&
        (i === 1 ||
          i === 3 ||
          i === 5 ||
          i === 7 ||
          i === 9)
      ) {
        hasPip = true;
      }

      if (
        value === 6 &&
        (i === 1 ||
          i === 3 ||
          i === 4 ||
          i === 6 ||
          i === 7 ||
          i === 9)
      ) {
        hasPip = true;
      }

      pips.push(
        <div
          key={i}
          className={`pip-slot ${
            hasPip ? "active" : ""
          }`}
        />
      );
    }

    return pips;
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="dice-component-wrapper">

      <div
        className={`dice-face ${
          isRolling ? "rolling" : ""
        } ${disabled ? "disabled" : ""}`}
        onClick={handleRollClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Dice showing value ${diceValue}`}
      >

        <div className="dice-grid">
          {renderDicePips(diceValue)}
        </div>

      </div>

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