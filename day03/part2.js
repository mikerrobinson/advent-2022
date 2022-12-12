var lineReader = require('line-reader');

let total = 0;
let index = 0;
let rucksacks = [];

lineReader.eachLine('day3.txt', function(line, last) {
  console.log(line);

  rucksacks.push(line);

  if (index % 3 == 2) {
    // rucksacks now contains a proper group of three

    let i = 0;
    while (!rucksacks[1].includes(rucksacks[0].charAt(i)) || !rucksacks[2].includes(rucksacks[0].charAt(i))) {
      i++;
    }

    let letter = rucksacks[0].charAt(i);
    let score = 0;

    if (letter == letter.toUpperCase()) {
      score = letter.charCodeAt() - 64 + 26;
    } else {
      score = letter.charCodeAt() - 96;
    }

    total += score;

    console.log(rucksacks[0]);
    console.log(rucksacks[1]);
    console.log(rucksacks[2]);
    console.log(letter);
    console.log("---------------------------------");

    rucksacks = [];
    index = 0;
  } else {
    index++;
  }

  if (last) {
    console.log(`Total: ${total}`);
    return false; // stop reading
  }
});


