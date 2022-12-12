const fs = require('fs')
const contents = fs.readFileSync('day6.txt', 'utf8')

console.log(contents[0]);
console.log(contents[1]);
console.log(contents[2]);

for (let j = 3; j < contents.length; j++) {
  console.log(contents[j]);
  if (contents[j] !== contents[j-1] &&
    contents[j] !== contents[j-2] &&
    contents[j] !== contents[j-3] &&
    contents[j-1] !== contents[j-2] &&
    contents[j-1] !== contents[j-3] &&
    contents[j-2] !== contents[j-3]) {
      console.log(j+1);
      break;
    }
}
