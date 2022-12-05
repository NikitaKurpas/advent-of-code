const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input1', 'utf8');
const lines = input.split('\n');
const result = lines.map(line => {
    let leftHalf = new Set();
    // iterate over the first half of the string
    for (let i = 0; i < line.length / 2; i++) {
        leftHalf.add(line[i]);
    }
    let sharedElements = new Set();
    // iterate over the second half of the string and check if the character is in the first half
    for (let i = line.length / 2; i < line.length; i++) {
        if (leftHalf.has(line[i])) {
            sharedElements.add(line[i]);
        }
    }

    let sum = 0;
    sharedElements.forEach(element => {
        const charCode = element.charCodeAt(0);
        if (charCode >= 'a'.charCodeAt(0)) {
            const score = charCode - 'a'.charCodeAt(0) + 1
            sum += score
        } else if (charCode >= 'A'.charCodeAt(0)) {
            const score = charCode - 'A'.charCodeAt(0) + 27
            sum += score;
        }
    })

    return sum;
}).reduce((a, b) => a + b, 0);

console.log(result)