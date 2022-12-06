const fs = require('fs');
const input = fs.readFileSync(__dirname + "/input", "utf8");

for (let right = 4; right < input.length; right++) {
    const left = right - 4;
    
    const set = new Set(input.slice(left, right));
    if (set.size === 4) {
        return console.log(right)
    }
}