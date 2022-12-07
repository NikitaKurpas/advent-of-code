const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const root = { name: "/", type: "dir", size: 0, nodes: [] };
let currentPath = [root];

let command;
let arg;
input.split("\n").forEach((line) => {
  if (line.startsWith("$")) {
    [, command, arg] = line.split(" ");
    processCommand(command, arg);
  } else {
    processOutput(command, line);
  }
});
computeSizes(root);
const unusedSpace = 70000000 - root.size;
const spaceNeeded = 30000000 - unusedSpace;
console.log(findSmallestDir(root, spaceNeeded).size);

function processCommand(command, args) {
  switch (command) {
    case "cd":
      if (args === "/") {
        currentPath = [root];
      } else if (args === "..") {
        currentPath.pop();
      } else {
        const nextDir = currentPath
          .peek()
          .nodes.find((node) => node.type === "dir" && node.name === args);
        currentPath.push(nextDir);
      }
      break;
  }
}

function processOutput(command, output) {
  switch (command) {
    case "ls":
      const parts = output.split(" ");
      if (parts[0] === "dir") {
        const childNode = { name: parts[1], type: "dir", size: 0, nodes: [] };
        currentPath.peek().nodes.push(childNode);
      } else {
        const childNode = {
          name: parts[1],
          type: "file",
          size: parseInt(parts[0]),
        };
        currentPath.peek().nodes.push(childNode);
      }
      break;
  }
}

// Perform a DFS to find the total size of the all directories
function computeSizes(node) {
  if (node.type === "file") {
    return node.size;
  }
  let totalSize = 0;
  node.nodes.forEach((child) => {
    totalSize += computeSizes(child);
  });
  node.size = totalSize;
  return totalSize;
}

// Find the smallest directory that can be deleted
function findSmallestDir(node, minSize) {
  if (node.type === "file") {
    return 0;
  }
  let smallestDir = node;
  node.nodes.forEach((child) => {
    const smallestChild = findSmallestDir(child);
    if (
      smallestChild.size >= minSize &&
      smallestChild.size < smallestDir.size
    ) {
      smallestDir = smallestChild;
    }
  });
  return smallestDir;
}
