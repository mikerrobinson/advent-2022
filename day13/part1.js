var lineReader = require('line-reader');

let row = 0;
let index = 0;
let left = right = "";
let correctPairs = [];

compareInts = (left, right, indent) => {
  if (left < right) {
    console.log(`${indent}  - Left side is smaller, so inputs are in the right order`);
    return -1;
  } else if (right < left) {
    console.log(`${indent}  - Right side is smaller, so inputs are not in the right order`);
    return 1;
  } else {
    return 0;
  }
}

compareArrays = (left, right, indent) => {
  let i = 0;
  while (i < left.length && i < right.length) {
    let result = compare(left[i], right[i], indent + "  ");
    if (result) return result;
    i++
  }
  if (left.length < right.length) {
    console.log(`${indent}  - Left side ran out of items, so inputs are in the right order`);
    return -1
  }
  if (right.length < left.length) {
    console.log(`${indent}  - Right side ran out of items, so inputs are in not the right order`);
    return 1;
  }
  return 0;
}

const compare = (left, right, indent) => {
  console.log(`${indent}- Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);
  if (typeof(left) == "number" && typeof(right) == "number") {
    return compareInts(left, right, indent);
  } else if (Array.isArray(left) && Array.isArray(right)) {
    return compareArrays(left, right, indent);
  } else {
    if (typeof(left) == "number") {
      console.log(`${indent}- Mixed types; convert left to [${left}] and retry comparison`);
      return compare([left], right, indent + "  ");
    } else {
      console.log(`${indent}- Mixed types; convert right to [${right}] and retry comparison`);
      return compare(left, [right], indent + "  ");
    }
  }
}

lineReader.eachLine('input.txt', function(line, last) {
  row++;

  if (row % 3 == 1) {
    left = JSON.parse(line);
  } else if (row % 3 == 2) {
    index++;
    right = JSON.parse(line);
    if (compare(left, right, "") == -1) {
      correctPairs.push(index);
    }
  } else {
    // no op
  }


  if (last) {
    console.log(correctPairs);

    console.log(correctPairs.reduce( (accumulator, value) => accumulator += value, 0));
    return false; // stop reading
  }
});
