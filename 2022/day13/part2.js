const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const result = input
  .split("\n")
  .filter(line => line.length > 0)
  .map(line => JSON.parse(line))
  .concat([[[2]], [[6]]])
  .sort((left, right) => compare(left, right))
  .map(line => JSON.stringify(line));

const first = result.findIndex(line => line === "[[2]]") + 1;
const second = result.findIndex(line => line === "[[6]]") + 1;
console.log(first * second);

function compare(left, right) {
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (i === left.length) {
      return -1;
    } else if (i === right.length) {
      return 1;
    }

    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      return compare(left[i], right[i]);
    } else if (Array.isArray(left[i]) && typeof right[i] === "number") {
      return compare(left[i], [right[i]]);
    } else if (typeof left[i] === "number" && Array.isArray(right[i])) {
      return compare([left[i]], right[i]);
    } else if (left[i] < right[i]) {
      return -1;
    } else if (left[i] > right[i]) {
      return 1;
    }
  }

  return 0;
}
