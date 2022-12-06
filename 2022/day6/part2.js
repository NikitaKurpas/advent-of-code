const fs = require('fs');
const input = fs.readFileSync(__dirname + "/input", "utf8");

for (let right = 14; right < input.length; right++) {
    const left = right - 14;
    
    const set = new Set(input.slice(left, right));
    if (set.size === 14) {
        return console.log(right)
    }
}