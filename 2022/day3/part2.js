const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input', 'utf8');
const groups = input.split('\n').reduce((groups, line, idx) => {
    if (idx % 3 === 0) {
        groups.push([]);
    }
    groups[groups.length - 1].push(line);
    return groups;
}, []);
const result = groups.map((group) => {
    const shared = group
        .reduce((previous, current) => {
            const shared = new Set();
            current.split('').forEach(element => {
                if (previous.has(element)) {
                    shared.add(element);
                }
            })
            return shared;
        }, new Set(group[0]))

    let sum = 0;
    shared.forEach(element => {
        const charCode = element.charCodeAt(0);
        if (charCode >= 'a'.charCodeAt(0)) {
            const score = charCode - 'a'.charCodeAt(0) + 1
            sum += score
        } else if (charCode >= 'A'.charCodeAt(0)) {
            const score = charCode - 'A'.charCodeAt(0) + 27
            sum += score;
        }
    })
    return sum
}).reduce((a, b) => a + b, 0);

console.log(result)