const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const lineNumber = 2000000;
const result = input
  .split("\n")
  .map((line) => {
    const [sx, sy, bx, by] = line.match(/-?\d+/g).map(Number);
    const range = Math.abs(sx - bx) + Math.abs(sy - by);
    return { sx, sy, range };
  })
  .filter((s) => lineNumber >= s.sy - s.range && lineNumber <= s.sy + s.range)
  .map((s) => {
    const distanceToLine = Math.abs(s.sy - lineNumber);
    const lineXRange = [
      s.sx - s.range + distanceToLine,
      s.sx + s.range - distanceToLine,
    ];
    return lineXRange;
  })
  .sort((a, b) => a[0] - b[0])
  .reduce((acc, range) => {
    range;
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
  }, [])
  .reduce((acc, range) => {
    range;
    return acc + (Math.abs(range[1] - range[0]) + 1);
  }, 0);

console.log(result - 1);
