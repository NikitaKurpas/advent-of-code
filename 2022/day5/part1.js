const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");
const lines = input.split("\n");

const stacksCount = (lines[0].length + 1) / 4;
let stacks = new Array(stacksCount).fill(0).map(() => []);
lines.forEach((line) => {
  if (line.startsWith("[")) {
    line.split("").forEach((char, idx) => {
      if (idx % 2 === 1 && char !== " ") {
        const stackIdx = (idx - 1) / 4;
        stacks[stackIdx].push(char);
      }
    });
  }

  if (line === "") {
    stacks.forEach((stack) => stack.reverse());
  }

  if (line.startsWith("m")) {
    const [count, from, to] = line.match(/\d+/g).map(Number);
    const fromStack = stacks[from - 1];
    const toStack = stacks[to - 1];
    const moved = fromStack.splice(fromStack.length - count, count);
    toStack.push(...moved.reverse());
  }
});
const result = stacks.map((stack) => stack[stack.length - 1]).join("");
console.log(result);
