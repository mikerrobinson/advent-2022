var lineReader = require('line-reader');

const moveScores = { A: { X: 4, Y: 8, Z: 3 }, B: { X: 1, Y: 5, Z: 9 }, C: { X: 7, Y: 2, Z: 6 } };
const strategies = { A: { X: 'Z', Y: 'X', Z: 'Y' }, B: { X: 'X', Y: 'Y', Z: 'Z' }, C: { X: 'Y', Y: 'Z', Z: 'X' } };
let total = 0;

lineReader.eachLine('day2.txt', function(line, last) {
  console.log(line);
  var [opponentMove, outcome] = line.split(' ');
  var myMove = strategies[opponentMove][outcome];
  score = moveScores[opponentMove][myMove];
  console.log(score);
  total += score;

  if (last) {
    console.log(`Total: ${total}`);

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    return false; // stop reading
  }
});


