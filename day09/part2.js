var lineReader = require('line-reader');

const HEIGHT = 21;
const WIDTH = 26;
const KNOTS = 10;
const START = [11, 15];

let knots = [];
for(let i = 0; i < KNOTS; i++) {
  knots.push(Array.from(START));
}
let head = knots[0];

let tailLocations = new Set();
tailLocations.add(`${knots[KNOTS-1][0]},${knots[KNOTS-1][1]}`);

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

const getMove = (head, tail) => {
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
      let char = ".";
      if (i == START[1] && j == START[0]) char = "s";
      for (let k = KNOTS - 1; k >= 0; k--) {
        if (i == knots[k][1] && j == knots[k][0]) char = (k==0) ? "H" : k.toString();
      }
      process.stdout.write(char);
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

//console.log("== Initial State ==\n");
//printLocations();

lineReader.eachLine('day9.txt', function(line, last) {
  let [direction, steps] = line.split(" ");

  //console.log(`== ${direction}  ${steps} ==\n`);

  while (steps > 0) {
    moveKnot(head, direction);

    for (let i = 1; i < KNOTS; i++) {
      moveKnot(knots[i], getMove(knots[i-1], knots[i]));
    }
    tailLocations.add(`${knots[KNOTS-1][0]},${knots[KNOTS-1][1]}`);
    steps--;
    //printLocations();
  }

  if (last) {
    printLocations();
    console.log(tailLocations.size);
    console.log(tailLocations.entries());
    return false; // stop reading
  }
});


