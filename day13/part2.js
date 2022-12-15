var lineReader = require('line-reader');

let packets = [];

compareInts = (left, right) => {
  if (left < right) {
    return -1;
  } else if (right < left) {
    return 1;
  } else {
    return 0;
  }
}

compareArrays = (left, right) => {
  let i = 0;
  while (i < left.length && i < right.length) {
    let result = compare(left[i], right[i]);
    if (result) return result;
    i++
  }
  if (left.length < right.length) {
    return -1
  }
  if (right.length < left.length) {
    return 1;
  }
  return 0;
}

const compare = (left, right) => {
  if (typeof(left) == "number" && typeof(right) == "number") {
    return compareInts(left, right);
  } else if (Array.isArray(left) && Array.isArray(right)) {
    return compareArrays(left, right);
  } else {
    if (typeof(left) == "number") {
      return compare([left], right);
    } else {
      return compare(left, [right]);
    }
  }
}

lineReader.eachLine('input.txt', function(line, last) {
  if (line != "") packets.push(JSON.parse(line));

  if (last) {
    packets.push(JSON.parse("[[2]]"));
    packets.push(JSON.parse("[[6]]"));
    packets.sort(compare);
    packets.forEach( (p, i) => console.log(i + ": " + JSON.stringify(p)));

    return false; // stop reading
  }
});
