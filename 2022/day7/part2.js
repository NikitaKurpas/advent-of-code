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

const totalSystemSpace = 70000000;
const unusedSpace = totalSystemSpace - root.size;
const spaceNeeded = 30000000 - unusedSpace;

// Find a smallest directory that can be deleted
function find_smallest_dir(node) {
    if (node.type === 'file') {
        return 0;
    }
    let smallestDir = node;
    node.nodes.forEach(child => {
        const smallestChild = find_smallest_dir(child);
        if (smallestChild.size >= spaceNeeded && smallestChild.size < smallestDir.size) {
            smallestDir = smallestChild;
        }
    });
    return smallestDir;
}

console.log(find_smallest_dir(root))

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
