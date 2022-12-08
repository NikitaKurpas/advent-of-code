const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const lines = input.split("\n");
const grid = lines.map((line) => line.split("").map(Number));

const width = grid[0].length;
const height = grid.length;

let bestScenicScore = 0;

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const current = grid[y][x];

    // check top
    let visibleTop = 0;
    for (let y2 = y - 1; y2 >= 0; y2--) {
      visibleTop++;
      if (grid[y2][x] >= current) {
        break;
      }
    }

    // check bottom
    let visibleBottom = 0;
    for (let y2 = y + 1; y2 < height; y2++) {
      visibleBottom++;
      if (grid[y2][x] >= current) {
        break;
      }
    }

    // check left
    let visibleLeft = 0;
    for (let x2 = x - 1; x2 >= 0; x2--) {
      visibleLeft++;
      if (grid[y][x2] >= current) {
        break;
      }
    }

    // check right
    let visibleRight = 0;
    for (let x2 = x + 1; x2 < width; x2++) {
      visibleRight++;
      if (grid[y][x2] >= current) {
        break;
      }
    }

    const scenicScore = visibleTop * visibleBottom * visibleLeft * visibleRight;
    bestScenicScore = Math.max(bestScenicScore, scenicScore);
  }
}

bestScenicScore;
