var lineReader = require('line-reader');

let arrangement = [];
let row = 0;

const getScore = (x,y) => {
  let height = arrangement[x][y];
  let lookingUp = lookingDown = lookingLeft = lookingRight = 0;

  for (let i = x - 1; i >= 0; i--) {
    lookingUp++;
    if (arrangement[i][y] >= height) break;
  }
  for (let i = x + 1; i < arrangement.length; i++) {
    lookingDown++;
    if (arrangement[i][y] >= height) break;
  }
  for (let i = y - 1; i >= 0; i--) {
    lookingLeft++;
    if (arrangement[x][i] >= height) break;
  }
  for (let i = y + 1; i < arrangement[x].length; i++) {
    lookingRight++
    if (arrangement[x][i] >= height) break;
  }
  return lookingUp * lookingDown * lookingLeft * lookingRight;
}

const getMaxScore = () => {
  let maxScore = 0;
  for (let i = 1; i < arrangement.length - 1; i++) {
    for (let j = 1; j < arrangement[i].length - 1; j++) {
      let score = getScore(i,j);
      console.log(`${i},${j}: ${score}`);
      maxScore = Math.max(maxScore, score);
    }
  }
  return maxScore;
}

lineReader.eachLine('day8.txt', function(line, last) {
  arrangement[row] = [...line].map(function(item) {
    return parseInt(item);
  });
  row++;

  if (last) {
    console.log(getMaxScore());
    return false; // stop reading
  }
});


