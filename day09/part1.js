var lineReader = require('line-reader');

const HEIGHT = 5;
const WIDTH = 6;
let start = [0, 4];
let head = Array.from(start);
let tail = Array.from(start);
let tailLocations = new Set();
tailLocations.add(`${tail[0]},${tail[1]}`);

const moveKnot = (knot, direction) => {
  switch (direction) {
    case "R":
      knot[0]++;
      break;
    case "L":
      knot[0]--;
      break;
    case "D":
      knot[1]++;
      break;
    case "U":
      knot[1]--;
      break;
    case "UR":
      knot[0]++;
      knot[1]--;
      break;
    case "UL":
      knot[0]--;
      knot[1]--;
      break;
    case "DR":
      knot[0]++;
      knot[1]++;
      break;
    case "DL":
      knot[0]--;
      knot[1]++;
      break;
  }
}

const getTailMove = (head, tail) => {
  let x = head[0]-tail[0];
  let y = head[1]-tail[1];
  let distance = Math.sqrt(x * x + y * y);

  // head and tail are in same/adjacent locations
  if (distance < 2) return "";

  if (head[0] == tail[0]) {
    // same column - just determine U vs D
    return (y > 0) ? "D" : "U";
  } else if (head[1] == tail[1]) {
    // same row - just determine L vs R
    return (x > 0) ? "R" : "L";
  } else {
    // diagonal
    if (x > 0) {
      return (y > 0) ? "DR" : "UR";
    } else {
      return (y > 0) ? "DL" : "UL";
    }
  }
}

const printLocations = () => {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (i == head[1] && j == head[0]) process.stdout.write("H");
      else if (i == tail[1] && j == tail[0]) process.stdout.write("T");
      else if (i == start[1] && j == start[0]) process.stdout.write("s");
      else process.stdout.write(".");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

console.log("== Initial State ==\n");
printLocations();

lineReader.eachLine('day9.txt', function(line, last) {
  let [direction, steps] = line.split(" ");

  console.log(`== ${direction}  ${steps} ==\n`);

  while (steps > 0) {
    moveKnot(head, direction);
    moveKnot(tail, getTailMove(head, tail));
    tailLocations.add(`${tail[0]},${tail[1]}`);
    steps--;
    printLocations();
  }

  if (last) {
    printLocations();
    console.log(tailLocations.size);
    console.log(tailLocations.entries());
    return false; // stop reading
  }
});


