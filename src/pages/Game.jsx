import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LudoBoard from "../components/ludo/LudoBoard";
import Dice from "../components/ludo/Dice";
import PlayerPanel from "../components/ludo/PlayerPanel";
import TurnIndicator from "../components/ludo/TurnIndicator";
import GameControls from "../components/ludo/GameControls";

import "./Game.css";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  /* =========================================
     GET PLAYER COUNT
  ========================================= */

  const params = new URLSearchParams(
    location.search
  );

  const urlPlayerCount = Number(
    params.get("players")
  );

  const playerCount = [2, 3, 4].includes(
    urlPlayerCount
  )
    ? urlPlayerCount
    : 4;


  /* =========================================
     ALL PLAYERS
  ========================================= */

  const allPlayers = [
    {
      id: 1,
      name: "Player 1",
      color: "green",
    },

    {
      id: 2,
      name: "Player 2",
      color: "yellow",
    },

    {
      id: 3,
      name: "Player 3",
      color: "red",
    },

    {
      id: 4,
      name: "Player 4",
      color: "blue",
    },
  ];


  /* =========================================
     SELECT ACTIVE PLAYERS

     2 Players:
     Green + Red

     3 Players:
     Green + Yellow + Red

     4 Players:
     Green + Yellow + Red + Blue
  ========================================= */

  let players;

  if (playerCount === 2) {
    players = [
      allPlayers[0], // Green
      allPlayers[2], // Red
    ];
  } else {
    players = allPlayers.slice(
      0,
      playerCount
    );
  }


  /* =========================================
     ACTIVE COLORS
  ========================================= */

  const activeColors = players.map(
    (player) => player.color
  );


  /* =========================================
     TOKEN INITIAL STATE

     -1 = Home
      0-51 = Common path
      52-56 = Home lane
      57 = Finished
  ========================================= */

  const createTokens = () => [
    -1,
    -1,
    -1,
    -1,
  ];


  const [tokenPositions, setTokenPositions] =
    useState({
      green: createTokens(),
      yellow: createTokens(),
      red: createTokens(),
      blue: createTokens(),
    });


  /* =========================================
     CURRENT PLAYER

     Store actual player ID.

     2-player example:

     1 = Green
     3 = Red

     Turn:
     1 → 3 → 1 → 3
  ========================================= */

  const [currentPlayer, setCurrentPlayer] =
    useState(players[0].id);


  const currentPlayerData =
    players.find(
      (player) =>
        player.id === currentPlayer
    );


  const currentColor =
    currentPlayerData?.color || "green";


  /* =========================================
     DICE
  ========================================= */

  const [diceValue, setDiceValue] =
    useState(null);


  /* =========================================
     SOUND
  ========================================= */

  const [soundEnabled, setSoundEnabled] =
    useState(true);


  /* =========================================
     CHECK WHETHER TOKEN CAN MOVE
  ========================================= */

  const canTokenMove = (
    color,
    tokenIndex,
    dice
  ) => {
    if (!dice) {
      return false;
    }

    if (!activeColors.includes(color)) {
      return false;
    }

    const position =
      tokenPositions[color][tokenIndex];


    /* Finished token */

    if (position === 57) {
      return false;
    }


    /* Token inside home */

    if (position === -1) {
      return dice === 6;
    }


    /* Cannot overshoot final position */

    if (
      position + dice > 57
    ) {
      return false;
    }


    return true;
  };


  /* =========================================
     CHECK IF CURRENT PLAYER HAS MOVABLE TOKEN
  ========================================= */

  const hasMovableToken = (
    color,
    dice
  ) => {
    return tokenPositions[color].some(
      (_, tokenIndex) =>
        canTokenMove(
          color,
          tokenIndex,
          dice
        )
    );
  };


  /* =========================================
     MOVE TO NEXT PLAYER

     Uses the players array rather than
     assuming IDs are 1,2,3,4.

     2 players:
     Green → Red → Green

     3 players:
     Green → Yellow → Red → Green

     4 players:
     Green → Yellow → Red → Blue
  ========================================= */

  const moveToNextPlayer = () => {
    const currentIndex =
      players.findIndex(
        (player) =>
          player.id === currentPlayer
      );


    if (currentIndex === -1) {
      setCurrentPlayer(
        players[0].id
      );

      return;
    }


    const nextIndex =
      (currentIndex + 1) %
      players.length;


    setCurrentPlayer(
      players[nextIndex].id
    );
  };


  /* =========================================
     DICE ROLL
  ========================================= */

  const handleDiceRoll = (
    rolledNumber
  ) => {
    setDiceValue(
      rolledNumber
    );


    const movable =
      hasMovableToken(
        currentColor,
        rolledNumber
      );


    /*
      No token can move.

      Give turn to next player.
    */

    if (!movable) {
      setTimeout(() => {
        setDiceValue(null);

        moveToNextPlayer();
      }, 700);

      return;
    }
  };


  /* =========================================
     GET PLAYER PATH
  ========================================= */

  const getPlayerPath = (
    color
  ) => {
    const commonPath = [
      "6-1",
      "6-2",
      "6-3",
      "6-4",
      "6-5",

      "5-6",
      "4-6",
      "3-6",
      "2-6",
      "1-6",
      "0-6",

      "0-7",
      "0-8",

      "1-8",
      "2-8",
      "3-8",
      "4-8",
      "5-8",

      "6-9",
      "6-10",
      "6-11",
      "6-12",
      "6-13",
      "6-14",

      "7-14",
      "8-14",

      "8-13",
      "8-12",
      "8-11",
      "8-10",
      "8-9",

      "9-8",
      "10-8",
      "11-8",
      "12-8",
      "13-8",
      "14-8",

      "14-7",
      "14-6",

      "13-6",
      "12-6",
      "11-6",
      "10-6",
      "9-6",

      "8-5",
      "8-4",
      "8-3",
      "8-2",
      "8-1",
      "8-0",

      "7-0",
      "6-0",
    ];


    const startIndices = {
      green: 0,
      yellow: 13,
      red: 26,
      blue: 39,
    };


    const homeLanes = {
      green: [
        "7-1",
        "7-2",
        "7-3",
        "7-4",
        "7-5",
      ],

      yellow: [
        "1-7",
        "2-7",
        "3-7",
        "4-7",
        "5-7",
      ],

      red: [
        "7-13",
        "7-12",
        "7-11",
        "7-10",
        "7-9",
      ],

      blue: [
        "13-7",
        "12-7",
        "11-7",
        "10-7",
        "9-7",
      ],
    };


    const startIndex =
      startIndices[color];


    const sharedPath =
      Array.from(
        { length: 52 },
        (_, index) =>
          commonPath[
            (startIndex + index) % 52
          ]
      );


    return [
      ...sharedPath,
      ...homeLanes[color],
      "7-7",
    ];
  };


  /* =========================================
     TOKEN CLICK
  ========================================= */

  const handleTokenClick = (
    color,
    tokenNumber
  ) => {
    if (
      color !== currentColor
    ) {
      return;
    }


    if (
      diceValue === null
    ) {
      return;
    }


    const tokenIndex =
      tokenNumber - 1;


    const movable =
      canTokenMove(
        color,
        tokenIndex,
        diceValue
      );


    if (!movable) {
      return;
    }


    const oldPosition =
      tokenPositions[color][
        tokenIndex
      ];


    let newPosition;


    /*
      Token comes out of home
      when rolling 6.
    */

    if (
      oldPosition === -1
    ) {
      newPosition = 0;
    } else {
      newPosition =
        oldPosition + diceValue;
    }


    /* =====================================
       CREATE UPDATED STATE
    ===================================== */

    const updatedPositions = {
      ...tokenPositions,

      [color]: [
        ...tokenPositions[color],
      ],
    };


    updatedPositions[color][
      tokenIndex
    ] = newPosition;


    /* =====================================
       CAPTURE
    ===================================== */

    if (
      newPosition >= 0 &&
      newPosition <= 51
    ) {
      const path =
        getPlayerPath(color);


      const targetCell =
        path[newPosition];


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


      /*
        Safe cells cannot capture.
      */

      if (
        !safeCells.has(
          targetCell
        )
      ) {
        activeColors.forEach(
          (otherColor) => {
            if (
              otherColor === color
            ) {
              return;
            }


            const otherPath =
              getPlayerPath(
                otherColor
              );


            const otherTokens =
              updatedPositions[
                otherColor
              ];


            otherTokens.forEach(
              (
                otherPosition,
                otherIndex
              ) => {
                if (
                  otherPosition < 0 ||
                  otherPosition > 51
                ) {
                  return;
                }


                const otherCell =
                  otherPath[
                    otherPosition
                  ];


                if (
                  otherCell ===
                  targetCell
                ) {
                  updatedPositions[
                    otherColor
                  ] = [
                    ...updatedPositions[
                      otherColor
                    ],
                  ];


                  /*
                    Captured token goes
                    back to home.
                  */

                  updatedPositions[
                    otherColor
                  ][otherIndex] =
                    -1;
                }
              }
            );
          }
        );
      }
    }


    /* =====================================
       SAVE TOKEN POSITION
    ===================================== */

    setTokenPositions(
      updatedPositions
    );


    /* =====================================
       CLEAR DICE
    ===================================== */

    setDiceValue(null);


    /* =====================================
       SIX = EXTRA TURN
    ===================================== */

    if (
      diceValue === 6
    ) {
      return;
    }


    /* =====================================
       NEXT PLAYER
    ===================================== */

    moveToNextPlayer();
  };


  /* =========================================
     RESTART
  ========================================= */

  const handleRestart = () => {
    setTokenPositions({
      green: createTokens(),
      yellow: createTokens(),
      red: createTokens(),
      blue: createTokens(),
    });


    setCurrentPlayer(
      players[0].id
    );


    setDiceValue(null);
  };


  /* =========================================
     NEW GAME
  ========================================= */

  const handleNewGame = () => {
    navigate(
      "/game-setup"
    );
  };


  /* =========================================
     SOUND
  ========================================= */

  const handleSoundToggle = () => {
    setSoundEnabled(
      (previous) =>
        !previous
    );
  };


  /* =========================================
     HOW TO PLAY
  ========================================= */

  const handleHowToPlay = () => {
    navigate(
      "/how-to-play"
    );
  };


  /* =========================================
     EXIT
  ========================================= */

  const handleExit = () => {
    navigate("/");
  };


  /* =========================================
     RENDER PLAYER
  ========================================= */

  const renderPlayer = (
    player,
    positionClass
  ) => {
    return (
      <div
        key={player.id}
        className={`player-position ${positionClass}`}
      >
        <PlayerPanel
          players={[player]}
          currentPlayer={
            currentPlayer
          }
        />

        <Dice
          onRoll={
            handleDiceRoll
          }

          disabled={
            currentPlayer !==
              player.id ||
            diceValue !== null
          }
        />
      </div>
    );
  };


  /* =========================================
     PLAYER POSITIONS
  ========================================= */

  const getPlayerPosition =
    (index) => {
      /*
        2 PLAYERS

        Green = top
        Red = bottom
      */

      if (
        playerCount === 2
      ) {
        return index === 0
          ? "player-two-top"
          : "player-two-bottom";
      }


      /*
        3 PLAYERS

        Green = top-left
        Yellow = top-right
        Red = bottom-center
      */

      if (
        playerCount === 3
      ) {
        const positions = [
          "player-three-top-left",
          "player-three-top-right",
          "player-three-bottom",
        ];

        return positions[index];
      }


      /*
        4 PLAYERS
      */

      const positions = [
        "player-top-left",
        "player-top-right",
        "player-bottom-right",
        "player-bottom-left",
      ];

      return positions[index];
    };


  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="game-page">

      <div className="game-container">

        {/* Turn Indicator */}

        <div className="game-turn-section">
          <TurnIndicator
            currentPlayer={
              currentPlayer
            }

            playerColor={
              currentColor
            }
          />
        </div>


        {/* =================================
            BOARD + PLAYERS
        ================================= */}

        <div
          className={`players-board-layout player-count-${playerCount}`}
        >

          {/* PLAYERS */}

          {players.map(
            (player, index) =>
              renderPlayer(
                player,
                getPlayerPosition(
                  index
                )
              )
          )}


          {/* BOARD */}

          <div className="board-section">

            <LudoBoard
              tokenPositions={
                tokenPositions
              }

              currentPlayer={
                currentPlayer
              }

              diceValue={
                diceValue
              }

              activeColors={
                activeColors
              }

              onTokenClick={
                handleTokenClick
              }
            />

          </div>

        </div>


        {/* =================================
            GAME CONTROLS
        ================================= */}

        <div className="game-footer-section">

          <GameControls
            onNewGame={
              handleNewGame
            }

            onRestart={
              handleRestart
            }

            onSoundToggle={
              handleSoundToggle
            }

            onHowToPlay={
              handleHowToPlay
            }

            onExit={
              handleExit
            }

            soundEnabled={
              soundEnabled
            }
          />

        </div>

      </div>

    </div>
  );
}

export default Game;