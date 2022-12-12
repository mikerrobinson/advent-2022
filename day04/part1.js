var lineReader = require('line-reader');

let total = 0;
let contains = [];

lineReader.eachLine('day4.txt', function(line, last) {

  let ranges = line.split(',');
  let r1 = ranges[0].split('-');
  let r2 = ranges[1].split('-');

  if (parseInt(r1[0]) <= parseInt(r2[0]) && parseInt(r1[1]) >= parseInt(r2[1])) {
    total++;
    //console.log(`parent: ${r1[0]}-${r1[1]},\t\tchild: ${r2[0]}-${r2[1]}`);
    contains.push({parent: `${r1[0]}-${r1[1]}`, child: `${r2[0]}-${r2[1]}`})
  } else if (parseInt(r2[0]) <= parseInt(r1[0]) && parseInt(r2[1]) >= parseInt(r1[1])) {
    total++;
    //console.log(`parent: ${r2[0]}-${r2[1]},\t\tchild: ${r1[0]}-${r1[1]}`);
    contains.push({parent: `${r2[0]}-${r2[1]}`, child: `${r1[0]}-${r1[1]}`})
  }

  if (last) {
    contains.sort((a, b) => { return a.parent < b.parent }).forEach(item => console.log(item));
    console.log(`Total: ${total}`);
    return false; // stop reading
  }
});


