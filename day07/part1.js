var lineReader = require('line-reader');
const { argv } = require('process');

const COMMAND_REGEX = /^\$ (?<command>cd|ls) (?<parameter>.*)/;
const DIR_REGEX = /^dir (?<directoryName>.*)/;
const FILE_REGEX = /^(?<fileSize>\d*) (?<fileName>.*)/;

const CUTOFF = 100000;
const tree = {};
let total = 0;
let pwd = tree;
tree._parent = null;
tree._size = 0;

const aggregate = (obj) => {
  let sum = 0;
  for (let k in obj) {
    if (k == "_parent" || k == "_size") {
      // no op
    } else if (typeof obj[k] === "object") {
      sum += obj[k]._size <= CUTOFF ? obj[k]._size : 0;
      sum += aggregate(obj[k])
    } else if (obj[k] <= CUTOFF) {
    //   // base case, stop recurring
    //   sum += obj[k];
    }
  }
  return sum;
}

const updateSizes = (node, size) => {
  node._size += size;
  if (node._parent != null) updateSizes(node._parent, size);
}

lineReader.eachLine('day7.txt', function(line, last) {

  if (match = line.match(COMMAND_REGEX)) {
    if (match.groups.command === "cd") {
      switch(match.groups.parameter) {
        case "/":
          pwd = tree;
          break;
        case "..":
          if (pwd._parent != null) pwd = pwd._parent;
          break;
        default:
          pwd = pwd[match.groups.parameter];
          break;
      }
    } else {
      // ignore the ls
    }
  } else if (match = line.match(DIR_REGEX)) {
    if (typeof pwd[match.groups.directoryName] === 'undefined') {
      pwd[match.groups.directoryName] = {};
      pwd[match.groups.directoryName]._parent = pwd;
      pwd[match.groups.directoryName]._size = 0;
    }
  } else if (match = line.match(FILE_REGEX)) {
    if (typeof pwd[match.groups.fileName] === 'undefined') {
      let size = parseInt(match.groups.fileSize)
      pwd[match.groups.fileName] = size;
      updateSizes(pwd, size);
    }
  }

  if (last) {
    console.log(tree);
    console.log(`Total: ${aggregate(tree)}`);
    return false; // stop reading
  }
});


