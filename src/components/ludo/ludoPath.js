// The 52 shared cells of the Ludo board.
//
// Green starts at 6-1
// Yellow starts at 1-8
// Red starts at 8-13
// Blue starts at 13-6

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


// Starting position of each player
const startIndices = {
  green: 0,
  yellow: 13,
  red: 26,
  blue: 39,
};


// Create a separate 52-cell path for each player
const playerPaths = {
  green: [],
  yellow: [],
  red: [],
  blue: [],
};

Object.entries(startIndices).forEach(
  ([color, startIndex]) => {
    playerPaths[color] = Array.from(
      { length: 52 },
      (_, index) => {
        return commonPath[
          (startIndex + index) % 52
        ];
      }
    );
  }
);


// Named exports
export {
  commonPath,
  startIndices,
  playerPaths,
};


// Default export
export default playerPaths;