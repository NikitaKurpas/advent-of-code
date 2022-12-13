const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const result = input.split("\n\n").reduce((sum, pair, idx) => {
  const [left, right] = pair.split("\n").map((line) => JSON.parse(line));
  return compare(left, right) ? (sum += idx + 1) : sum;
}, 0);

console.log(result);

function compare(left, right) {
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (i === left.length) {
      return true;
    } else if (i === right.length) {
      return false;
    }

    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      return compare(left[i], right[i]);
    } else if (Array.isArray(left[i]) && typeof right[i] === "number") {
      return compare(left[i], [right[i]]);
    } else if (typeof left[i] === "number" && Array.isArray(right[i])) {
      return compare([left[i]], right[i]);
    } else if (left[i] < right[i]) {
      return true;
    } else if (left[i] > right[i]) {
      return false;
    }
  }

  return true;
}
