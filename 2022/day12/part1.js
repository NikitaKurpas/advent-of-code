const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const grid = [];
let start;
let end;

const lines = input.split("\n");
for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const chars = line.split("");
  grid[y] ??= [];

  for (let x = 0; x < chars.length; x++) {
    grid[y][x] = chars[x].charCodeAt(0);
    if (chars[x] === "S") {
      start = `${x},${y}`;
      grid[y][x] = "a".charCodeAt(0);
    } else if (chars[x] === "E") {
      end = `${x},${y}`;
      grid[y][x] = "z".charCodeAt(0);
    }
  }
}

// debugging
const visited = new Array(grid.length)
  .fill(0)
  .map(() => new Array(grid[0].length).fill(" "));

const shortestPath = search(start, end);
console.log(shortestPath.length - 1);

// debugging
fs.writeFileSync(__dirname + "/visited", visited.map((row) => row.join("")).join("\n"));

// Taken from https://en.wikipedia.org/wiki/A*_search_algorithm
function search(start, goal) {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  openSet = new Set([start]);

  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  cameFrom = new Map();

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  gScore = new Map();
  gScore.set(start, 0);

  while (openSet.size > 0) {
    let current = [...openSet].reduce((a, b) =>
      (gScore.get(a) ?? Infinity) < (gScore.get(b) ?? Infinity) ? a : b
    );

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);

    for (let neighbor of getNeighbors(current)) {
      tentativeGScore = gScore.get(current) + 1;

      if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);

        // debugging
        const [x, y] = neighbor.split(",").map(Number);
        visited[y][x] = String.fromCharCode(grid[y][x]);

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }

  console.log("No path found");
}

function reconstructPath(cameFrom, current) {
  totalPath = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    totalPath.push(current);
  }
  return totalPath;
}

function getNeighbors(node) {
  const [x, y] = node.split(",").map(Number);
  const nodeCost = grid[y][x];
  const neighbors = [
    { x: x, y: y - 1 },
    { x: x, y: y + 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
  ]
    .filter((neighbor) => {
      const neighborCost = grid[neighbor.y]?.[neighbor.x];
      return (
        Boolean(neighborCost) &&
        (neighborCost > nodeCost ? neighborCost - nodeCost === 1 : true)
      );
    })
    .map((neighbor) => `${neighbor.x},${neighbor.y}`);

  return neighbors;
}
