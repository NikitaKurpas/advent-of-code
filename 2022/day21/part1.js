const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

let nodes = {};

input.split("\n").map((line) => {
  const [monkey, rest] = line.split(": ");
  nodes[monkey] = rest;
});

const stack = ["root"];

while (stack.length !== 0) {
  const monkey = stack.pop();
  const node = nodes[monkey];

  if (isNumber(node)) {
    nodes[monkey] = parseInt(node);
  } else {
    const [, leftMonkey, op, rightMonkey] = /(.+)\s([\+\-\*\/])\s(.+)/g.exec(node);

    if (isNumber(nodes[leftMonkey]) && isNumber(nodes[rightMonkey])) {
        nodes[monkey] = eval(`${nodes[leftMonkey]} ${op} ${nodes[rightMonkey]}`);
        continue;
    }

    stack.push(monkey) // reeval current monkey after its dependencies are evaluated
    
    if (!isNumber(nodes[leftMonkey])) {
        stack.push(leftMonkey);
    }
    if (!isNumber(nodes[rightMonkey])) {
        stack.push(rightMonkey);
    }
  }
}

console.log(nodes['root'])

function isNumber(val) {
    return typeof val === 'number' || !isNaN(parseInt(val));
}
