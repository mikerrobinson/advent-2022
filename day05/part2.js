var lineReader = require('line-reader');

let definitions = [];
let stacks = [];

const parseDefinitions = (definitions) => {
  // transpose to get initial state of stacks as columns from rows of array
  for (let l = definitions.length - 1; l >= 0; l--) {
    let i = 1;
    while (i < definitions[l].length) {
      let index = (i - 1) / 4;
      if (definitions[l].charAt(i).match(/[a-z]/i)) {
        if (!stacks[index]) stacks[index] = [];
        stacks[index].push(definitions[l].charAt(i));
      }
      i += 4;
    }
  }
  return stacks;
}

const printStacks = (stacks) => {
  stacks.forEach( stack => console.log(stack));
}

lineReader.eachLine('day5.txt', function(line, last) {

  if (stacks.length == 0) {
    // still reading definition
    if (parseInt(line)) {
      // done reading definitions, now time to parse
      stacks = parseDefinitions(definitions);
    } else {
      definitions.push(line);
    }
  } else {
    // reading moves
    var [move, moveCount, from, source, to, destination] = line.split(' ');
    if (parseInt(moveCount)) {
      items = stacks[source - 1].splice(stacks[source - 1].length - moveCount);
      stacks[destination - 1].push(...items);
    }
  }

  if (last) {
    printStacks(stacks);
    return false; // stop reading
  }
});


