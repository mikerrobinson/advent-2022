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

const toSizeArray = (obj) => {
  let result = [];
  for (let k in obj) {
    if (k == "_parent" || k == "_size") {
    } else if (typeof obj[k] === "object") {
      result.push(obj[k]._size);
      result.push(...toSizeArray(obj[k]));
    } else if (obj[k] <= CUTOFF) {
    }
  }
  return result;
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

    let array = toSizeArray(tree).sort((a, b) => (a - b));
    let unusedSpace = 70000000 - tree._size;
    let spaceNeeded = 30000000 - unusedSpace;
    for (let i = 0; i<array.length; i++) {
      if (array[i] > spaceNeeded) {
        console.log(array[i]);
        break;
      }
    }

    // console.log(array);
    // let sum = array.reduce((accumulator, currentValue) => {
    //     console.log(`${accumulator}, ${currentValue}`);
    //     if (currentValue <= CUTOFF) accumulator += currentValue;
    //     return accumulator;
    // }, 0);
    // console.log(`Total: ${sum}`);
    return false; // stop reading
  }
});


