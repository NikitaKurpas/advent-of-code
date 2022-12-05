const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input', 'utf8');
const lines = input.split('\n');
const result = lines.filter(line => {
    const [one, two] = line.split(',').map(range => range.split('-').map(Number));

    const first = one[0] < two[0] ? one : two
    const second = one[0] > two[0] ? one : two

    return first[1] >= second[0]
}).length

console.log(result)