const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

Array.prototype.last = function() {
    return this[this.length - 1]
};
const root = { name: '/', type: 'dir', size: 0, nodes: [] }
let currentPath = [root]

let lastCommand;
input.split("\n").forEach((line) => {
  if (line.startsWith("$")) { // command format "$ <command>"
    lastCommand = line.split(" ")[1];
    const args = line.split(" ")[2];
    processCommand(lastCommand, args);
  } else {
    processOutput(lastCommand, line);
  }
});

// Perform a DFS to find the total size of the all directories
function compute_sizes(node) {
    if (node.type === 'file') {
        return node.size;
    }
    let totalSize = 0;
    node.nodes.forEach(child => {
        totalSize += compute_sizes(child);
    });
    node.size = totalSize;
    return totalSize;
}
compute_sizes(root)

// Find all directories with size <= 100000

function find_big_dirs(node) {
    let totalSize = 0;
    if (node.type === 'file') {
        return 0;
    }
    if (node.size <= 100000) {
        totalSize += node.size;
    }
    node.nodes.forEach(child => {
        totalSize += find_big_dirs(child);
    });
    return totalSize
}

console.log(find_big_dirs(root))

function processCommand(command, args) {
  switch (command) {
    case "cd":
      if (args === "/") {
        currentPath = [root];
      } else if (args === '..') {
        currentPath.pop();
      } else {
        const nextDir = currentPath.last().nodes.find(node => node.type === 'dir' && node.name === args);
        currentPath.push(nextDir);
      }
      break;
    case "ls":
      break;
  }
}

function processOutput(command, output) {
    switch (command) {
        case "ls":
            const parts = output.split(" ")
            if (parts[0] === 'dir') {
                const childNode = { name: parts[1], type: 'dir', size: 0, nodes: [] }
                currentPath.last().nodes.push(childNode)
            } else {
                const childNode = { name: parts[1], type: 'file', size: parseInt(parts[0]) }
                currentPath.last().nodes.push(childNode)
            }
        break;
    }
}
