import { useEffect, useRef, useState } from "react";
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
     GET URL PARAMETERS
  ========================================= */

  const params = new URLSearchParams(location.search);

  const urlPlayerCount = Number(params.get("players"));

  const gameMode = params.get("mode");

  const difficulty = params.get("difficulty") || "medium";

  const isComputerGame = gameMode === "computer";

  /* =========================================
     PLAYER COUNT
  ========================================= */

  const playerCount = isComputerGame
    ? 2
    : [2, 3, 4].includes(urlPlayerCount)
      ? urlPlayerCount
      : 4;

  /* =========================================
     ALL PLAYERS
  ========================================= */

  const allPlayers = [
    {
      id: 1,
      name: isComputerGame ? "You" : "Player 1",
      color: "green",
    },

    {
      id: 2,
      name: "Player 2",
      color: "yellow",
    },

    {
      id: 3,
      name: isComputerGame ? "Computer" : "Player 3",
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

     Normal 2 players:
     Green + Red

     Computer:
     Green = You
     Red = Computer

     3 players:
     Green + Yellow + Red

     4 players:
     Green + Yellow + Red + Blue
  ========================================= */

  let players;

  if (playerCount === 2) {
    players = [allPlayers[0], allPlayers[2]];
  } else {
    players = allPlayers.slice(0, playerCount);
  }

  /* =========================================
     ACTIVE COLORS
  ========================================= */

  const activeColors = players.map(
    (player) => player.color
  );

  /* =========================================
     COMPUTER
  ========================================= */

  const computerPlayerId = 3;
  const computerColor = "red";

  /*
     IMPORTANT:

     The computer turn must depend on the
     CURRENT PLAYER.

     Do NOT check whether computer exists.
  */

  const isComputerTurn =
    isComputerGame &&
    currentPlayer === computerPlayerId;

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

  const [
    tokenPositions,
    setTokenPositions,
  ] = useState({
    green: createTokens(),
    yellow: createTokens(),
    red: createTokens(),
    blue: createTokens(),
  });

  /* =========================================
     CURRENT PLAYER

     Computer game:

     Green / You
          ↓
     Red / Computer
          ↓
     Green / You
  ========================================= */

  const [
    currentPlayer,
    setCurrentPlayer,
  ] = useState(players[0].id);

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

  const [
    diceValue,
    setDiceValue,
  ] = useState(null);

  /* =========================================
     COMPUTER DICE ANIMATION
  ========================================= */

  const [
    computerRollValue,
    setComputerRollValue,
  ] = useState(null);

  const [
    computerRollKey,
    setComputerRollKey,
  ] = useState(0);

  /* =========================================
     COMPUTER TURN NUMBER

     Used when computer gets a 6.
  ========================================= */

  const [
    computerTurnNumber,
    setComputerTurnNumber,
  ] = useState(0);

  /* =========================================
     COMPUTER TIMER
  ========================================= */

  const computerTimerRef =
    useRef(null);

  /* =========================================
     SOUND
  ========================================= */

  const [
    soundEnabled,
    setSoundEnabled,
  ] = useState(true);

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

    /* Cannot overshoot */

    if (position + dice > 57) {
      return false;
    }

    return true;
  };

  /* =========================================
     CHECK IF PLAYER HAS MOVABLE TOKEN
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
     HUMAN DICE ROLL
  ========================================= */

  const handleDiceRoll = (
    rolledNumber
  ) => {
    /*
       IMPORTANT:

       Only stop the roll if the ACTUAL
       current player is the computer.
    */

    if (
      isComputerGame &&
      currentPlayer === computerPlayerId
    ) {
      return;
    }

    /*
       Make sure it is actually this
       player's turn.
    */

    if (
      !currentPlayerData ||
      currentPlayerData.id !== currentPlayer
    ) {
      return;
    }

    setDiceValue(
      rolledNumber
    );

    const movable =
      hasMovableToken(
        currentColor,
        rolledNumber
      );

    /* =====================================
       NO MOVABLE TOKEN
    ===================================== */

    if (!movable) {
      setTimeout(() => {
        setDiceValue(null);

        /*
           If player rolls 6 but has no
           movable token, still give extra
           turn according to game rule.
        */

        if (rolledNumber === 6) {
          return;
        }

        moveToNextPlayer();
      }, 700);

      return;
    }
  };

  /* =========================================
     MOVE COMPUTER TOKEN
  ========================================= */

  const moveComputerToken = (
    tokenIndex,
    dice
  ) => {
    const color =
      computerColor;

    const oldPosition =
      tokenPositions[color][tokenIndex];

    /* =====================================
       CALCULATE NEW POSITION
    ===================================== */

    let newPosition;

    if (oldPosition === -1) {
      newPosition = 0;
    } else {
      newPosition =
        oldPosition + dice;
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

      const safeCells =
        new Set([
          "2-6",
          "2-8",
          "6-2",
          "6-12",
          "8-2",
          "8-12",
          "12-6",
          "12-8",
        ]);

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

                  updatedPositions[
                    otherColor
                  ][otherIndex] = -1;
                }
              }
            );
          }
        );
      }
    }

    /* =====================================
       SAVE
    ===================================== */

    setTokenPositions(
      updatedPositions
    );

    /* =====================================
       CLEAR DICE
    ===================================== */

    setDiceValue(null);

    /* =====================================
       COMPUTER GETS EXTRA TURN ON 6
    ===================================== */

    if (dice === 6) {
      setComputerTurnNumber(
        (previous) =>
          previous + 1
      );

      return;
    }

    /* =====================================
       NEXT PLAYER
    ===================================== */

    moveToNextPlayer();
  };

  /* =========================================
     COMPUTER TOKEN AI
  ========================================= */

  const chooseComputerToken = (
    dice
  ) => {
    const validTokens = [];

    for (
      let i = 0;
      i < 4;
      i++
    ) {
      if (
        canTokenMove(
          computerColor,
          i,
          dice
        )
      ) {
        validTokens.push(i);
      }
    }

    if (
      validTokens.length === 0
    ) {
      return null;
    }

    /* =====================================
       EASY
    ===================================== */

    if (
      difficulty === "easy"
    ) {
      const randomIndex =
        Math.floor(
          Math.random() *
            validTokens.length
        );

      return validTokens[
        randomIndex
      ];
    }

    /* =====================================
       SCORE TOKENS
    ===================================== */

    const scoredTokens =
      validTokens.map(
        (tokenIndex) => {
          const position =
            tokenPositions[
              computerColor
            ][tokenIndex];

          const newPosition =
            position === -1
              ? 0
              : position + dice;

          let score = 0;

          /* Bring token out */

          if (
            position === -1 &&
            dice === 6
          ) {
            score += 80;
          }

          /* Finish */

          if (
            newPosition === 57
          ) {
            score += 120;
          }

          /* Move forward */

          score +=
            newPosition * 2;

          /* =================================
             CAPTURE CHECK
          ================================= */

          if (
            newPosition >= 0 &&
            newPosition <= 51
          ) {
            const computerPath =
              getPlayerPath(
                computerColor
              );

            const targetCell =
              computerPath[
                newPosition
              ];

            const safeCells =
              new Set([
                "2-6",
                "2-8",
                "6-2",
                "6-12",
                "8-2",
                "8-12",
                "12-6",
                "12-8",
              ]);

            if (
              !safeCells.has(
                targetCell
              )
            ) {
              activeColors.forEach(
                (otherColor) => {
                  if (
                    otherColor ===
                    computerColor
                  ) {
                    return;
                  }

                  const otherPath =
                    getPlayerPath(
                      otherColor
                    );

                  tokenPositions[
                    otherColor
                  ].forEach(
                    (otherPosition) => {
                      if (
                        otherPosition >=
                          0 &&
                        otherPosition <=
                          51
                      ) {
                        if (
                          otherPath[
                            otherPosition
                          ] ===
                          targetCell
                        ) {
                          score += 150;
                        }
                      }
                    }
                  );
                }
              );
            }
          }

          /* =================================
             HARD MODE
          ================================= */

          if (
            difficulty === "hard"
          ) {
            if (
              position >= 0
            ) {
              score +=
                position * 2;
            }

            if (
              newPosition >= 52
            ) {
              score += 60;
            }

            if (
              newPosition === 57
            ) {
              score += 100;
            }
          }

          return {
            tokenIndex,
            score,
          };
        }
      );

    scoredTokens.sort(
      (a, b) =>
        b.score - a.score
    );

    return scoredTokens[0]
      .tokenIndex;
  };

  /* =========================================
     COMPUTER TURN
  ========================================= */

  useEffect(() => {
    /*
       Not computer game
    */

    if (!isComputerGame) {
      return;
    }

    /*
       IMPORTANT:

       Only execute this effect when
       currentPlayer is actually Computer.
    */

    if (!isComputerTurn) {
      return;
    }

    /*
       Do not start another roll while
       a dice value already exists.
    */

    if (diceValue !== null) {
      return;
    }

    /* Clear previous timer */

    if (
      computerTimerRef.current
    ) {
      clearTimeout(
        computerTimerRef.current
      );

      computerTimerRef.current =
        null;
    }

    /* =====================================
       COMPUTER THINKING DELAY
    ===================================== */

    computerTimerRef.current =
      setTimeout(() => {
        const rolledNumber =
          Math.floor(
            Math.random() * 6
          ) + 1;

        /* =================================
           SET ACTUAL GAME DICE
        ================================= */

        setDiceValue(
          rolledNumber
        );

        /* =================================
           SEND NUMBER TO DICE COMPONENT
        ================================= */

        setComputerRollValue(
          rolledNumber
        );

        /* =================================
           FORCE NEW DICE ANIMATION
        ================================= */

        setComputerRollKey(
          (previous) =>
            previous + 1
        );

        /* =================================
           CHECK MOVABLE TOKEN
        ================================= */

        const movable =
          hasMovableToken(
            computerColor,
            rolledNumber
          );

        /* =================================
           NO MOVE
        ================================= */

        if (!movable) {
          computerTimerRef.current =
            setTimeout(() => {
              setDiceValue(null);

              if (
                rolledNumber === 6
              ) {
                setComputerTurnNumber(
                  (previous) =>
                    previous + 1
                );
              } else {
                moveToNextPlayer();
              }
            }, 1100);

          return;
        }

        /* =================================
           MOVE AFTER DICE ANIMATION
        ================================= */

        computerTimerRef.current =
          setTimeout(() => {
            const selectedToken =
              chooseComputerToken(
                rolledNumber
              );

            if (
              selectedToken === null
            ) {
              setDiceValue(null);

              if (
                rolledNumber === 6
              ) {
                setComputerTurnNumber(
                  (previous) =>
                    previous + 1
                );
              } else {
                moveToNextPlayer();
              }

              return;
            }

            moveComputerToken(
              selectedToken,
              rolledNumber
            );
          }, 1100);
      }, 1000);

    /* =====================================
       CLEANUP
    ===================================== */

    return () => {
      if (
        computerTimerRef.current
      ) {
        clearTimeout(
          computerTimerRef.current
        );

        computerTimerRef.current =
          null;
      }
    };

  }, [
    isComputerGame,
    isComputerTurn,
    computerTurnNumber,
  ]);

  /* =========================================
     CLEAN COMPUTER TIMER
  ========================================= */

  useEffect(() => {
    return () => {
      if (
        computerTimerRef.current
      ) {
        clearTimeout(
          computerTimerRef.current
        );

        computerTimerRef.current =
          null;
      }
    };
  }, []);

  /* =========================================
     HUMAN TOKEN CLICK
  ========================================= */

  const handleTokenClick = (
    color,
    tokenNumber
  ) => {
    /*
       Computer tokens cannot be
       manually controlled.
    */

    if (
      isComputerGame &&
      color === computerColor
    ) {
      return;
    }

    /*
       Only current player
    */

    if (
      color !== currentColor
    ) {
      return;
    }

    /*
       No dice
    */

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

    /* =====================================
       NEW POSITION
    ===================================== */

    let newPosition;

    if (
      oldPosition === -1
    ) {
      newPosition = 0;
    } else {
      newPosition =
        oldPosition + diceValue;
    }

    /* =====================================
       UPDATED STATE
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

      const safeCells =
        new Set([
          "2-6",
          "2-8",
          "6-2",
          "6-12",
          "8-2",
          "8-12",
          "12-6",
          "12-8",
        ]);

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
       SAVE
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

    setComputerRollValue(
      null
    );

    setComputerRollKey(0);

    setComputerTurnNumber(0);
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
    const playerIsComputer =
      isComputerGame &&
      player.id ===
        computerPlayerId;

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

        {/* =================================
            COMPUTER DICE
        ================================= */}

        {playerIsComputer ? (
          <Dice
            disabled={true}
            computerRoll={
              computerRollValue
            }
            computerRollKey={
              computerRollKey
            }
          />
        ) : (
          /* ===============================
             HUMAN DICE
          =============================== */

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
        )}
      </div>
    );
  };

  /* =========================================
     PLAYER POSITIONS

     SAME OLD BOARD LAYOUT
  ========================================= */

  const getPlayerPosition = (
    index
  ) => {
    /* =====================================
       2 PLAYERS
    ===================================== */

    if (
      playerCount === 2
    ) {
      return index === 0
        ? "player-two-top"
        : "player-two-bottom";
    }

    /* =====================================
       3 PLAYERS
    ===================================== */

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

    /* =====================================
       4 PLAYERS
    ===================================== */

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

        {/* =================================
            TURN INDICATOR
        ================================= */}

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

          {/* =================================
              PLAYERS
          ================================= */}

          {players.map(
            (player, index) =>
              renderPlayer(
                player,
                getPlayerPosition(
                  index
                )
              )
          )}

          {/* =================================
              BOARD
          ================================= */}

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