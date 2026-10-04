// ==========================================
// LUDO PATH
// ==========================================
//
// Position system:
//
// -1 = Token is inside starting home
//
// 0 - 51 = 52 common/shared path cells
//
// 52 - 56 = 5 colored home-lane cells
//
// 57 = Final home / finished
//
// ==========================================


// ==========================================
// COMMON 52-CELL PATH
// ==========================================

const commonPath = [
  // GREEN START
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",

  // UP
  "5-6",
  "4-6",
  "3-6",
  "2-6",
  "1-6",
  "0-6",

  "0-7",
  "0-8",

  // YELLOW START
  "1-8",
  "2-8",
  "3-8",
  "4-8",
  "5-8",

  // RIGHT
  "6-9",
  "6-10",
  "6-11",
  "6-12",
  "6-13",
  "6-14",

  "7-14",
  "8-14",

  // RED START
  "8-13",
  "8-12",
  "8-11",
  "8-10",
  "8-9",

  // DOWN
  "9-8",
  "10-8",
  "11-8",
  "12-8",
  "13-8",
  "14-8",

  "14-7",
  "14-6",

  // BLUE START
  "13-6",
  "12-6",
  "11-6",
  "10-6",
  "9-6",

  // LEFT
  "8-5",
  "8-4",
  "8-3",
  "8-2",
  "8-1",
  "8-0",

  "7-0",
  "6-0",
];


// ==========================================
// PLAYER START INDEX
// ==========================================

const startIndices = {
  green: 0,
  yellow: 13,
  red: 26,
  blue: 39,
};


// ==========================================
// COLORED HOME LANES
// ==========================================
//
// Each player has 5 colored cells
// after the 52 common cells.
//
// 52,53,54,55,56
//
// Then:
// 57 = final center
//
// ==========================================

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


// ==========================================
// FINAL HOME
// ==========================================

const finalHome = "7-7";


// ==========================================
// CREATE PLAYER PATHS
// ==========================================

const playerPaths = {
  green: [],
  yellow: [],
  red: [],
  blue: [],
};


// ==========================================
// BUILD EACH PLAYER'S PATH
// ==========================================

Object.entries(startIndices).forEach(
  ([color, startIndex]) => {

    // -------------------------------
    // 52 COMMON CELLS
    // -------------------------------

    const sharedPath = Array.from(
      { length: 52 },
      (_, index) => {
        return commonPath[
          (startIndex + index) % 52
        ];
      }
    );


    // -------------------------------
    // 5 COLORED HOME-LANE CELLS
    // -------------------------------

    const coloredHomePath =
      homeLanes[color];


    // -------------------------------
    // FINAL HOME
    // -------------------------------

    playerPaths[color] = [
      ...sharedPath,
      ...coloredHomePath,
      finalHome,
    ];
  }
);


// ==========================================
// EXPORT
// ==========================================

export {
  commonPath,
  startIndices,
  homeLanes,
  finalHome,
  playerPaths,
};

export default playerPaths;