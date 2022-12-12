var lineReader = require('line-reader');

let total = 0;

lineReader.eachLine('day4.txt', function(line, last) {

  let ranges = line.split(',');
  let r1 = ranges[0].split('-');
  let r2 = ranges[1].split('-');

  if (parseInt(r1[0]) < parseInt(r2[0])) {
    if (parseInt(r2[0]) <= parseInt(r1[1])) {
      total++;
      console.log(line);
    }
  } else if (parseInt(r2[0]) < parseInt(r1[0])) {
    if (parseInt(r1[0]) <= parseInt(r2[1])) {
      total++;
      console.log(line);
    }
  } else {
    total++;
    console.log(line);
  }

  if (last) {
    console.log(`Total: ${total}`);
    return false; // stop reading
  }
});


