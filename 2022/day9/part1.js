const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }

const tailPath = new Set(['0,0']);
input.split("\n").forEach((line) => {
    const command = line.split(" ")
    const distance = parseInt(command[1])

    let coordinate;
    let direction;
    switch (command[0]) {
        case "U":
            coordinate = "y"
            direction = 1
            break;
        case "D":
            coordinate = "y"
            direction = -1
            break;
        case "L":
            coordinate = "x"
            direction = -1
            break;
        case "R":
            coordinate = "x"
            direction = 1
            break;
    }

    for (let i = 0; i < distance; i++) {
        head[coordinate] += direction
        
        if (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
            if (Math.abs(head.x - tail.x) > 0) {
                tail.x += head.x < tail.x ? -1 : 1
            }
            if (Math.abs(head.y - tail.y) > 0) {
                tail.y += head.y < tail.y ? -1 : 1
            }
            tailPath.add(`${tail.x},${tail.y}`)
        }
    }
})

console.log(tailPath.size)