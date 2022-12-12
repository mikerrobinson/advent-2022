const fs = require('fs')
const contents = fs.readFileSync('day6.txt', 'utf8')

const uniqueCharacters = (chars) => {
  for (let j = 0; j < chars.length; j++) {
    for (let i = 0; i < chars.length; i++) {
      if (i !== j && chars[j] === chars[i]) return false;
    }
  }
  return true;
}

const markerLength = 14;

for (let j = markerLength; j < contents.length; j++) {
  console.log('-----');
  if (uniqueCharacters(contents.substr(j-markerLength, markerLength))) {
    console.log(j);
    break;
  }
}
