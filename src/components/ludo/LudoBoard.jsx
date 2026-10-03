import LudoCell from "./LudoCell";
import Token from "./Token";

import { playerPaths } from "./ludoPath";

import "./LudoBoard.css";

function LudoBoard({
  tokenPositions = {
    green: [-1, -1, -1, -1],
    yellow: [-1, -1, -1, -1],
    red: [-1, -1, -1, -1],
    blue: [-1, -1, -1, -1],
  },

  currentPlayer = 1,

  diceValue = null,

  onTokenClick,
}) {
  // --------------------------------
  // SAFE CELLS
  // --------------------------------

  const safeCells = new Set([
    "2-6",
    "2-8",
    "6-2",
    "6-12",
    "8-2",
    "8-12",
    "12-6",
    "12-8",
  ]);

  // --------------------------------
  // START CELLS
  // --------------------------------

  const startCells = {
    "6-1": "green",
    "1-8": "yellow",
    "8-13": "red",
    "13-6": "blue",
  };

  // --------------------------------
  // HOME POSITIONS
  // --------------------------------

  /*
    Each color has four token homes.

    IMPORTANT:
    A token is displayed here ONLY
    when its position is -1.
  */

  const homePositions = {
    green: [
      "1-1",
      "1-4",
      "4-1",
      "4-4",
    ],

    yellow: [
      "1-10",
      "1-13",
      "4-10",
      "4-13",
    ],

    red: [
      "10-10",
      "10-13",
      "13-10",
      "13-13",
    ],

    blue: [
      "10-1",
      "10-4",
      "13-1",
      "13-4",
    ],
  };

  // --------------------------------
  // CURRENT PLAYER COLOR
  // --------------------------------

  const playerColors = {
    1: "green",
    2: "yellow",
    3: "red",
    4: "blue",
  };

  const currentColor = playerColors[currentPlayer];

  // --------------------------------
  // GET CELL DATA
  // --------------------------------

  const getCellData = (row, col) => {
    const position = `${row}-${col}`;

    // ------------------------------
    // GREEN HOME
    // ------------------------------

    if (row <= 5 && col <= 5) {
      const isTokenSpot =
        homePositions.green.includes(position);

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "green",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // YELLOW HOME
    // ------------------------------

    if (row <= 5 && col >= 9) {
      const isTokenSpot =
        homePositions.yellow.includes(position);

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "yellow",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // BLUE HOME
    // ------------------------------

    if (row >= 9 && col <= 5) {
      const isTokenSpot =
        homePositions.blue.includes(position);

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "blue",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // RED HOME
    // ------------------------------

    if (row >= 9 && col >= 9) {
      const isTokenSpot =
        homePositions.red.includes(position);

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "red",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // GREEN HOME PATH
    // ------------------------------

    if (row === 7 && col >= 1 && col <= 5) {
      return {
        cellType: "home-path",
        color: "green",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // YELLOW HOME PATH
    // ------------------------------

    if (col === 7 && row >= 1 && row <= 5) {
      return {
        cellType: "home-path",
        color: "yellow",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // RED HOME PATH
    // ------------------------------

    if (row === 7 && col >= 9 && col <= 13) {
      return {
        cellType: "home-path",
        color: "red",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // BLUE HOME PATH
    // ------------------------------

    if (col === 7 && row >= 9 && row <= 13) {
      return {
        cellType: "home-path",
        color: "blue",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // CENTER
    // ------------------------------

    if (
      row >= 6 &&
      row <= 8 &&
      col >= 6 &&
      col <= 8
    ) {
      return {
        cellType: "center",
        color: "center",
        isSafe: false,
        isStart: false,
      };
    }

    // ------------------------------
    // START CELL
    // ------------------------------

    if (startCells[position]) {
      return {
        cellType: "normal",
        color: startCells[position],
        isSafe: true,
        isStart: true,
      };
    }

    // ------------------------------
    // SAFE CELL
    // ------------------------------

    if (safeCells.has(position)) {
      return {
        cellType: "safe",
        color: null,
        isSafe: true,
        isStart: false,
      };
    }

    // ------------------------------
    // NORMAL PATH
    // ------------------------------

    return {
      cellType: "normal",
      color: null,
      isSafe: false,
      isStart: false,
    };
  };

  // --------------------------------
  // GET HOME TOKEN
  // --------------------------------

  const getHomeToken = (cellPosition) => {
    for (const [color, positions] of Object.entries(
      tokenPositions
    )) {
      positions.forEach((position, tokenIndex) => {
        if (position === -1) {
          const homeCell =
            homePositions[color][tokenIndex];

          if (homeCell === cellPosition) {
            return;
          }
        }
      });
    }

    return null;
  };

  // --------------------------------
  // GET TOKENS ON BOARD CELL
  // --------------------------------

  const getBoardTokens = (cellPosition) => {
    const tokens = [];

    Object.entries(tokenPositions).forEach(
      ([color, positions]) => {
        positions.forEach(
          (position, tokenIndex) => {
            /*
              -1 means token is in home,
              therefore don't put it
              on the board.
            */

            if (position < 0) {
              return;
            }

            /*
              Get this player's path.
            */

            const path = playerPaths[color];

            if (!path) {
              return;
            }

            const boardCell = path[position];

            if (boardCell === cellPosition) {
              tokens.push({
                color,
                tokenNumber: tokenIndex + 1,
              });
            }
          }
        );
      }
    );

    return tokens;
  };

  // --------------------------------
  // CAN TOKEN MOVE?
  // --------------------------------

  const canTokenMove = (color, tokenNumber) => {
    // Not current player's token
    if (color !== currentColor) {
      return false;
    }

    // Dice hasn't been rolled
    if (diceValue === null) {
      return false;
    }

    const position =
      tokenPositions[color][tokenNumber - 1];

    /*
      Token in home:
      only 6 can move it out.
    */

    if (position === -1) {
      return diceValue === 6;
    }

    /*
      Token already on path:
      don't allow going beyond
      the current common path.
    */

    return position + diceValue <= 51;
  };

  // --------------------------------
  // CREATE BOARD
  // --------------------------------

  const boardGrid = [];

  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
      const cellPosition = `${row}-${col}`;

      const cellData = getCellData(row, col);

      const boardTokens =
        getBoardTokens(cellPosition);

      /*
        Find home token for this cell.
      */

      let homeToken = null;

      Object.entries(tokenPositions).forEach(
        ([color, positions]) => {
          positions.forEach(
            (position, tokenIndex) => {
              if (position !== -1) {
                return;
              }

              if (
                homePositions[color][tokenIndex] ===
                cellPosition
              ) {
                homeToken = {
                  color,
                  tokenNumber: tokenIndex + 1,
                };
              }
            }
          );
        }
      );

      boardGrid.push(
        <LudoCell
          key={cellPosition}
          row={row}
          col={col}
          cellType={cellData.cellType}
          color={cellData.color}
          isSafe={cellData.isSafe}
          isStart={cellData.isStart}
        >

          {/* =========================
              HOME TOKEN
          ========================== */}

          {homeToken && (
            <Token
              color={homeToken.color}
              tokenNumber={homeToken.tokenNumber}
              isMovable={canTokenMove(
                homeToken.color,
                homeToken.tokenNumber
              )}
              onClick={() =>
                onTokenClick?.(
                  homeToken.color,
                  homeToken.tokenNumber
                )
              }
            />
          )}

          {/* =========================
              BOARD TOKENS
          ========================== */}

          {boardTokens.map((token) => (
            <Token
              key={`${token.color}-${token.tokenNumber}`}
              color={token.color}
              tokenNumber={token.tokenNumber}
              isMovable={canTokenMove(
                token.color,
                token.tokenNumber
              )}
              onClick={() =>
                onTokenClick?.(
                  token.color,
                  token.tokenNumber
                )
              }
            />
          ))}

        </LudoCell>
      );
    }
  }

  return (
    <div className="ludo-board-wrapper">
      <div className="ludo-board-container">
        {boardGrid}
      </div>
    </div>
  );
}

export default LudoBoard;