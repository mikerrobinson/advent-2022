var lineReader = require('line-reader');

let cycle = 1;
let v = 1;
let steps = 0;
let strength = 0;

lineReader.eachLine('input.txt', function(line, last) {
  let [instruction, param] = line.split(" ");
  let increment = 0;

  switch (instruction) {
    case "addx":
      steps = 2;
      increment = parseInt(param);
      break;
    case "noop":
      steps = 1;
      break;
  }

  while (steps > 0) {
    let char = (((cycle%40-1)-(v-1))*((cycle%40-1)-(v+1)) <= 0) ? "#" : ".";
    process.stdout.write(char);
    if (cycle % 40 == 0) {
      process.stdout.write("\n")
    }
    cycle++;
    steps--;
  }

  v += increment;

  if (last) {
    console.log(`=====> ${strength}`);
    return false; // stop reading
  }
});


