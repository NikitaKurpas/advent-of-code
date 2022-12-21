const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

let nodes = {};

input.split("\n").map((line) => {
  const [monkey, rest] = line.split(": ");
  nodes[monkey] = isNumber(rest) ? parseInt(rest) : rest;
});
nodes["humn"] = "x";

const processed = new Set(["root", "humn"]);
const stack = ["root"];

while (stack.length !== 0) {
  const monkey = stack.pop();
  const node = nodes[monkey];

  if (isNumber(node)) {
    processed.add(monkey);
  } else {
    const [, leftMonkey, op, rightMonkey] = /(.+)\s([\+\-\*\/])\s(.+)/g.exec(
      node
    );

    if (isNumber(nodes[leftMonkey]) && isNumber(nodes[rightMonkey])) {
      nodes[monkey] = eval(`${nodes[leftMonkey]} ${op} ${nodes[rightMonkey]}`);
      processed.add(monkey);
    } else if (!processed.has(leftMonkey) || !processed.has(rightMonkey)) {
      stack.push(monkey);

      if (!processed.has(leftMonkey)) {
        stack.push(leftMonkey);
      }
      if (!processed.has(rightMonkey)) {
        stack.push(rightMonkey);
      }
    } else {
      processed.add(monkey);
    }
  }
}

const reverseOps = {
  "+": "-",
  "-": "+",
  "*": "/",
  "/": "*",
};
let [, left, op, right] = /(.+)\s([\+\-\*\/])\s(.+)/g.exec(nodes["root"]);
let unknown = !isNumber(nodes[left]) ? left : right;
let result = isNumber(nodes[left]) ? nodes[left] : nodes[right];
while (unknown !== "humn") {
  [, left, op, right] = /(.+)\s([\+\-\*\/])\s(.+)/g.exec(nodes[unknown]);
  unknown = !isNumber(nodes[left]) ? left : right;
  const known = isNumber(nodes[left]) ? left : right;
  result = eval(`${result} ${reverseOps[op]} ${nodes[known]}`);
}

// TODO: doesn't work for all inputs
console.log(result);

function isNumber(val) {
  return typeof val === "number" || !isNaN(parseInt(val));
}
