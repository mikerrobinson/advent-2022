var lineReader = require('line-reader');

let arrangement = [];
let row = 0;

const checkVisibility = (x,y) => {
  let height = arrangement[x][y];
  let visibleFromTop = visibleFromBottom = visibleFromLeft = visibleFromRight = true;
  for (let i = 0; i < x; i++) {
    if (arrangement[i][y] >= height) {
      visibleFromTop = false;
      break;
    }
  }
  if (visibleFromTop) return true;
  for (let i = x + 1; i < arrangement.length; i++) {
    if (arrangement[i][y] >= height) {
      visibleFromBottom = false;
      break;
    }
  }
  if (visibleFromBottom) return true;
  for (let i = 0; i < y; i++) {
    if (arrangement[x][i] >= height) {
      visibleFromLeft = false;
      break;
    }
  }
  if (visibleFromLeft) return true;
  for (let i = y + 1; i < arrangement[x].length; i++) {
    if (arrangement[x][i] >= height) {
      visibleFromRight = false;
      break;
    }
  }
  return visibleFromRight;
}

const countVisibility = () => {
  let count = 0;
  for (let i = 0; i < arrangement.length; i++) {
    for (let j = 0; j < arrangement[i].length; j++) {
      if (
        i == 0 ||
        j == 0 ||
        i == arrangement.length - 1 ||
        j == arrangement[i].length - 1 ||
        checkVisibility(i,j))
      {
        count++
      }
    }
  }
  return count;
}

lineReader.eachLine('day8.txt', function(line, last) {
  arrangement[row] = [...line].map(function(item) {
    return parseInt(item);
  });
  row++;

  if (last) {
    console.log(countVisibility());
    return false; // stop reading
  }
});


