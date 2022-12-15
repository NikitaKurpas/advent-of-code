const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const sensors = input.split("\n").map((line) => {
  const [sx, sy, bx, by] = line.match(/-?\d+/g).map(Number);
  const range = Math.abs(sx - bx) + Math.abs(sy - by);
  return { sx, sy, range };
});

for (let i = 0; i <= 4_000_000; i++) {
  const lineNumber = i;
  const ranges = sensors
    .filter((s) => lineNumber >= s.sy - s.range && lineNumber <= s.sy + s.range)
    .map((s) => {
      const distanceToLine = Math.abs(s.sy - lineNumber);
      const actionableLineXRange = [
        Math.max(0, s.sx - s.range + distanceToLine),
        Math.min(4_000_000, s.sx + s.range - distanceToLine),
      ];
      return actionableLineXRange;
    })
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, range) => {
      if (acc.length === 0) {
        return [range];
      }
      const lastRange = acc[acc.length - 1];
      if (lastRange[1] >= range[0]) {
        lastRange[1] = Math.max(lastRange[1], range[1]);
      } else {
        acc.push(range);
      }
      return acc;
    }, []);
  const unavailablePositions =
    ranges.reduce((acc, range) => {
      return acc + (Math.abs(range[1] - range[0]) + 1);
    }, 0) - 1;

  if (unavailablePositions < 4_000_000) {
    const x = ranges[0][1] + 1;
    console.log(x * 4_000_000 + lineNumber);
  }
}
