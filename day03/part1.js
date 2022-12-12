var lineReader = require('line-reader');

let total = 0;

lineReader.eachLine('day3.txt', function(line, last) {
  console.log(line);

  // split in half
  const secondCompartment = line.substring(line.length / 2);
  let i = 0;
  while (secondCompartment.indexOf(line.charAt(i)) == -1) {
    i++;
  }

  // get common item using indexOf
  let letter = line.charAt(i);
  let score = 0;

  if (letter == letter.toUpperCase()) {
    score = letter.charCodeAt() - 64 + 26;
  } else {
    score = letter.charCodeAt() - 96;
  }

  console.log(`${line} ... '${line.substring(0,line.length/2)}' -- '${secondCompartment}' ... ${letter} (${score})`);

  total += score;

  if (last) {
    console.log(`Total: ${total}`);
    return false; // stop reading
  }
});


