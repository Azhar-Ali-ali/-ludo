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

  activeColors = [
    "green",
    "yellow",
    "red",
    "blue",
  ],

  onTokenClick,
}) {
  /* =========================================
     PLAYER COLORS
  ========================================= */

  const playerColors = {
    1: "green",
    2: "yellow",
    3: "red",
    4: "blue",
  };

  const currentColor =
    playerColors[currentPlayer];


  /* =========================================
     TOKEN HOME POSITIONS
  ========================================= */

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


  /* =========================================
     SAFE CELLS
  ========================================= */

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


  /* =========================================
     START CELLS
  ========================================= */

  const startCells = {
    "6-1": "green",
    "1-8": "yellow",
    "8-13": "red",
    "13-6": "blue",
  };


  /* =========================================
     GET CELL INFORMATION
  ========================================= */

  const getCellData = (
    row,
    col
  ) => {
    const position =
      `${row}-${col}`;


    /* =====================================
       GREEN HOME
    ===================================== */

    if (
      row <= 5 &&
      col <= 5
    ) {
      const isTokenSpot =
        homePositions.green.includes(
          position
        );

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "green",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       YELLOW HOME
    ===================================== */

    if (
      row <= 5 &&
      col >= 9
    ) {
      const isTokenSpot =
        homePositions.yellow.includes(
          position
        );

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "yellow",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       BLUE HOME
    ===================================== */

    if (
      row >= 9 &&
      col <= 5
    ) {
      const isTokenSpot =
        homePositions.blue.includes(
          position
        );

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "blue",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       RED HOME
    ===================================== */

    if (
      row >= 9 &&
      col >= 9
    ) {
      const isTokenSpot =
        homePositions.red.includes(
          position
        );

      return {
        cellType: isTokenSpot
          ? "token-spot"
          : "base",

        color: "red",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       GREEN HOME LANE
    ===================================== */

    if (
      row === 7 &&
      col >= 1 &&
      col <= 5
    ) {
      return {
        cellType: "home-path",

        color: "green",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       YELLOW HOME LANE
    ===================================== */

    if (
      col === 7 &&
      row >= 1 &&
      row <= 5
    ) {
      return {
        cellType: "home-path",

        color: "yellow",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       RED HOME LANE
    ===================================== */

    if (
      row === 7 &&
      col >= 9 &&
      col <= 13
    ) {
      return {
        cellType: "home-path",

        color: "red",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       BLUE HOME LANE
    ===================================== */

    if (
      col === 7 &&
      row >= 9 &&
      row <= 13
    ) {
      return {
        cellType: "home-path",

        color: "blue",

        isSafe: false,

        isStart: false,
      };
    }


    /* =====================================
       CENTER
    ===================================== */

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


    /* =====================================
       START CELL
    ===================================== */

    if (
      startCells[position]
    ) {
      return {
        cellType: "normal",

        color:
          startCells[position],

        isSafe: true,

        isStart: true,
      };
    }


    /* =====================================
       SAFE CELL
    ===================================== */

    if (
      safeCells.has(position)
    ) {
      return {
        cellType: "safe",

        color: null,

        isSafe: true,

        isStart: false,
      };
    }


    /* =====================================
       NORMAL PATH CELL
    ===================================== */

    return {
      cellType: "normal",

      color: null,

      isSafe: false,

      isStart: false,
    };
  };


  /* =========================================
     GET TOKEN INSIDE HOME
  ========================================= */

  const getHomeToken = (
    cellPosition
  ) => {

    /*
      Only check active players.
    */

    for (
      const color of activeColors
    ) {

      const positions =
        tokenPositions[color];


      if (!positions) {
        continue;
      }


      for (
        let tokenIndex = 0;
        tokenIndex < positions.length;
        tokenIndex++
      ) {

        /*
          -1 means token is still
          inside its starting home.
        */

        if (
          positions[tokenIndex] !== -1
        ) {
          continue;
        }


        if (
          homePositions[color][
            tokenIndex
          ] === cellPosition
        ) {

          return {
            color,

            tokenNumber:
              tokenIndex + 1,
          };
        }
      }
    }


    return null;
  };


  /* =========================================
     GET TOKENS ON BOARD
  ========================================= */

  const getBoardTokens = (
    cellPosition
  ) => {

    const tokens = [];


    /*
      Only active colors are checked.
    */

    activeColors.forEach(
      (color) => {

        const positions =
          tokenPositions[color];


        if (!positions) {
          return;
        }


        const path =
          playerPaths[color];


        if (!path) {
          return;
        }


        positions.forEach(
          (
            position,
            tokenIndex
          ) => {

            /*
              -1 = home
            */

            if (
              position === -1
            ) {
              return;
            }


            /*
              57 = finished.
              It should not be rendered
              on a normal board cell.
            */

            if (
              position === 57
            ) {
              return;
            }


            const boardCell =
              path[position];


            if (
              boardCell === cellPosition
            ) {

              tokens.push({
                color,

                tokenNumber:
                  tokenIndex + 1,

                position,
              });
            }
          }
        );
      }
    );


    return tokens;
  };


  /* =========================================
     CHECK IF TOKEN CAN MOVE
  ========================================= */

  const canTokenMove = (
    color,
    tokenNumber
  ) => {

    /*
      Token must belong to
      the current player.
    */

    if (
      color !== currentColor
    ) {
      return false;
    }


    /*
      Dice must have been rolled.
    */

    if (
      diceValue === null ||
      diceValue === undefined
    ) {
      return false;
    }


    const tokenIndex =
      tokenNumber - 1;


    const positions =
      tokenPositions[color];


    if (!positions) {
      return false;
    }


    const position =
      positions[tokenIndex];


    /*
      Finished token cannot move.
    */

    if (
      position === 57
    ) {
      return false;
    }


    /*
      Token inside home.

      It needs a 6 to come out.
    */

    if (
      position === -1
    ) {
      return diceValue === 6;
    }


    /*
      Cannot go beyond
      final position.
    */

    if (
      position + diceValue > 57
    ) {
      return false;
    }


    return true;
  };


  /* =========================================
     BUILD BOARD
  ========================================= */

  const boardGrid = [];


  for (
    let row = 0;
    row < 15;
    row++
  ) {

    for (
      let col = 0;
      col < 15;
      col++
    ) {

      const cellPosition =
        `${row}-${col}`;


      const cellData =
        getCellData(
          row,
          col
        );


      const homeToken =
        getHomeToken(
          cellPosition
        );


      const boardTokens =
        getBoardTokens(
          cellPosition
        );


      boardGrid.push(
        <LudoCell
          key={cellPosition}
          row={row}
          col={col}
          cellType={
            cellData.cellType
          }
          color={
            cellData.color
          }
          isSafe={
            cellData.isSafe
          }
          isStart={
            cellData.isStart
          }
        >

          {/* =================================
              TOKEN INSIDE HOME
          ================================= */}

          {homeToken && (
            <Token
              color={
                homeToken.color
              }

              tokenNumber={
                homeToken.tokenNumber
              }

              isMovable={
                canTokenMove(
                  homeToken.color,
                  homeToken.tokenNumber
                )
              }

              onClick={() =>
                onTokenClick?.(
                  homeToken.color,
                  homeToken.tokenNumber
                )
              }
            />
          )}


          {/* =================================
              TOKENS ON BOARD
          ================================= */}

          {boardTokens.map(
            (token) => (

              <Token
                key={`${token.color}-${token.tokenNumber}`}
                color={
                  token.color
                }

                tokenNumber={
                  token.tokenNumber
                }

                isMovable={
                  canTokenMove(
                    token.color,
                    token.tokenNumber
                  )
                }

                onClick={() =>
                  onTokenClick?.(
                    token.color,
                    token.tokenNumber
                  )
                }
              />

            )
          )}

        </LudoCell>
      );
    }
  }


  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="ludo-board-wrapper">

      <div className="ludo-board-container">

        {boardGrid}

      </div>

    </div>
  );
}


export default LudoBoard;