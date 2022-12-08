const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const lines = input.split("\n");
const grid = lines.map((line) => line.split("").map(Number));

const width = grid[0].length;
const height = grid.length;

// let totalVisibleTrees = width * 2 + height * 2 - 4; // count the edge trees first
let totalVisibleTrees = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // check top
    let highestTop = -1;
    for (let y2 = y - 1; y2 >= 0; y2--) {
      highestTop = Math.max(highestTop, grid[y2][x]);
    }

    // check bottom
    let highestBottom = -1;
    for (let y2 = y + 1; y2 < height; y2++) {
      highestBottom = Math.max(highestBottom, grid[y2][x]);
    }

    // check left
    let highestLeft = -1;
    for (let x2 = x - 1; x2 >= 0; x2--) {
      highestLeft = Math.max(highestLeft, grid[y][x2]);
    }

    // check right
    let highestRight = -1;
    for (let x2 = x + 1; x2 < width; x2++) {
      highestRight = Math.max(highestRight, grid[y][x2]);
    }

    const current = grid[y][x];
    if (
      current > highestTop ||
      current > highestBottom ||
      current > highestLeft ||
      current > highestRight
    ) {
      totalVisibleTrees++;
    }
  }
}

// const topDownHighest = new Array(width).fill(0);
// const bottomUpHighest = new Array(width).fill(0);
// const leftRightHighest = new Array(height).fill(0);
// const rightLeftHighest = new Array(height).fill(0);

// for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//         if (y === 0) topDownHighest[x] = Number(lines[y][x])
//         if (y === height - 1) bottomUpHighest[x] = Number(lines[y][x])
//         if (x === 0) leftRightHighest[y] = Number(lines[y][x])
//         if (x === width - 1) rightLeftHighest[y] = Number(lines[y][x])
//     }
// }

// topDownHighest
// bottomUpHighest
// leftRightHighest
// rightLeftHighest

// for (let y = 1; y < height - 1; y++) {
//     for (let x = 1; x < width - 1; x++) {
//         const current = Number(lines[y][x])
//         const top = topDownHighest[x]
//         const bottom = bottomUpHighest[x]
//         const left = leftRightHighest[y]
//         const right = rightLeftHighest[y]

//         if (current > top || current > bottom || current > left || current > right) {
//             x
//             y
//             current
//             totalVisibleTrees++
//         }

//         if (y < Math.floor(height / 2) && current > topDownHighest[x]) topDownHighest[x] = current
//         if (y >= Math.ceil(height / 2) && current > bottomUpHighest[x]) bottomUpHighest[x] = current
//         if (x < Math.floor(width / 2) && current > leftRightHighest[y]) leftRightHighest[y] = current
//         if (x >= Math.ceil(width / 2) && current > rightLeftHighest[y]) rightLeftHighest[y] = current
//     }
// }

totalVisibleTrees;
