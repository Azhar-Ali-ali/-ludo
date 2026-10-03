import { useState } from "react";

import TurnIndicator from "../components/ludo/TurnIndicator";
import PlayerPanel from "../components/ludo/PlayerPanel";
import LudoBoard from "../components/ludo/LudoBoard";
import Dice from "../components/ludo/Dice";
import GameControls from "../components/ludo/GameControls";

import "./Game.css";

function Game() {
  const players = [
    { id: 1, name: "Player 1", color: "green" },
    { id: 2, name: "Player 2", color: "yellow" },
    { id: 3, name: "Player 3", color: "red" },
    { id: 4, name: "Player 4", color: "blue" },
  ];

  /*
    Token position:

    -1 = token is inside home
     0 = token is on starting square
     1 = one step after start
     2 = two steps after start
     ...
     51 = last common-path square
  */

  const [tokenPositions, setTokenPositions] = useState({
    green: [-1, -1, -1, -1],
    yellow: [-1, -1, -1, -1],
    red: [-1, -1, -1, -1],
    blue: [-1, -1, -1, -1],
  });

  const [currentPlayer, setCurrentPlayer] = useState(1);

  // null means the player has not rolled yet
  const [diceValue, setDiceValue] = useState(null);

  const currentColor = players[currentPlayer - 1].color;

  // --------------------------------
  // NEXT PLAYER
  // --------------------------------

  const moveToNextPlayer = () => {
    setCurrentPlayer((current) => {
      return current === 4 ? 1 : current + 1;
    });
  };

  // --------------------------------
  // DICE ROLL
  // --------------------------------

  const handleDiceRoll = (value) => {
    // Safety check:
    // player should not be able to roll again
    // while already waiting to choose a token.
    if (diceValue !== null) {
      return;
    }

    console.log(`${currentColor} rolled ${value}`);

    const currentTokens = tokenPositions[currentColor];

    const hasTokenOutsideHome = currentTokens.some(
      (position) => position >= 0
    );

    /*
      If player rolls 1-5 and ALL tokens
      are still inside home, there is no move.

      So immediately change turn.
    */
    if (value !== 6 && !hasTokenOutsideHome) {
      setDiceValue(null);
      moveToNextPlayer();
      return;
    }

    /*
      Otherwise save dice value.

      Dice will now become disabled
      until player chooses a token.
    */
    setDiceValue(value);
  };

  // --------------------------------
  // TOKEN CLICK
  // --------------------------------

  const handleTokenClick = (color, tokenNumber) => {
    // Only current player's tokens can move
    if (color !== currentColor) {
      return;
    }

    // Player must roll first
    if (diceValue === null) {
      return;
    }

    const tokenIndex = tokenNumber - 1;

    const currentPosition = tokenPositions[color][tokenIndex];

    /*
      TOKEN INSIDE HOME
    */

    if (currentPosition === -1) {
      // Only 6 can bring a token out
      if (diceValue !== 6) {
        return;
      }
    }

    /*
      Calculate new position.

      If token is in home:
      -1 + 6 does NOT mean 5.

      Instead it goes directly to
      its starting position = 0.
    */

    let newPosition;

    if (currentPosition === -1) {
      newPosition = 0;
    } else {
      newPosition = currentPosition + diceValue;
    }

    /*
      For now, don't allow token to go
      beyond the common path.

      We'll implement the colored home
      lane later.
    */

    if (newPosition > 51) {
      return;
    }

    /*
      Update token position
    */

    setTokenPositions((previousPositions) => ({
      ...previousPositions,

      [color]: previousPositions[color].map(
        (position, index) => {
          if (index === tokenIndex) {
            return newPosition;
          }

          return position;
        }
      ),
    }));

    /*
      Remember whether this was a 6
      before clearing diceValue.
    */

    const rolledSix = diceValue === 6;

    // Clear dice
    setDiceValue(null);

    /*
      If 6:
      Same player gets another turn.

      If not 6:
      Move to next player.
    */

    if (rolledSix) {
      return;
    }

    moveToNextPlayer();
  };

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <div className="game-page">
      <div className="game-container">

        {/* TURN INDICATOR */}
        <div className="game-turn-section">
          <TurnIndicator
            currentPlayer={currentPlayer}
            playerColor={currentColor}
          />
        </div>

        {/* PLAYERS + BOARD */}
        <div className="players-board-layout">

          {/* =========================
              PLAYER 1 - GREEN
          ========================== */}

          <div className="player-position player-top-left">

            <PlayerPanel
              players={[players[0]]}
              currentPlayer={currentPlayer}
            />

            <Dice
              disabled={
                currentPlayer !== 1 ||
                diceValue !== null
              }
              onRoll={handleDiceRoll}
            />

          </div>

          {/* =========================
              PLAYER 2 - YELLOW
          ========================== */}

          <div className="player-position player-top-right">

            <Dice
              disabled={
                currentPlayer !== 2 ||
                diceValue !== null
              }
              onRoll={handleDiceRoll}
            />

            <PlayerPanel
              players={[players[1]]}
              currentPlayer={currentPlayer}
            />

          </div>

          {/* =========================
              LUDO BOARD
          ========================== */}

          <div className="board-section">

            <LudoBoard
              tokenPositions={tokenPositions}
              currentPlayer={currentPlayer}
              diceValue={diceValue}
              onTokenClick={handleTokenClick}
            />

          </div>

          {/* =========================
              PLAYER 4 - BLUE
          ========================== */}

          <div className="player-position player-bottom-left">

            <PlayerPanel
              players={[players[3]]}
              currentPlayer={currentPlayer}
            />

            <Dice
              disabled={
                currentPlayer !== 4 ||
                diceValue !== null
              }
              onRoll={handleDiceRoll}
            />

          </div>

          {/* =========================
              PLAYER 3 - RED
          ========================== */}

          <div className="player-position player-bottom-right">

            <Dice
              disabled={
                currentPlayer !== 3 ||
                diceValue !== null
              }
              onRoll={handleDiceRoll}
            />

            <PlayerPanel
              players={[players[2]]}
              currentPlayer={currentPlayer}
            />

          </div>

        </div>

        {/* GAME CONTROLS */}

        <div className="game-footer-section">
          <GameControls />
        </div>

      </div>
    </div>
  );
}

export default Game;