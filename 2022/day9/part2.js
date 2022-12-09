Array.prototype.peek = function() {
    return this[this.length - 1]
}

const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input", "utf8");

const knots = new Array(10).fill(0).map(() => ({ x: 0, y: 0 }))

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
        const head = knots[0]
        head[coordinate] += direction

        for (let j = 0; j < knots.length - 1; j++) {
            const first = knots[j]
            const second = knots[j + 1]
            if (Math.abs(first.x - second.x) > 1 || Math.abs(first.y - second.y) > 1) {
                if (Math.abs(first.x - second.x) > 0) {
                    second.x += first.x < second.x ? -1 : 1
                }
                if (Math.abs(first.y - second.y) > 0) {
                    second.y += first.y < second.y ? -1 : 1
                }
            }
        }

        tailPath.add(`${knots.peek().x},${knots.peek().y}`)
    }
})

console.log(tailPath.size)