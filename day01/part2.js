var lineReader = require('line-reader');

let calories = [], temp = 0;
lineReader.eachLine('input.txt', function(line, last) {
  console.log(line);
  let v = parseInt(line)
  if (v) {
    temp += v;
  } else {
    calories.push(temp);
    temp = 0;
  }
  if (last) {
    calories.push(temp);
    temp = 0;

    console.log(`Elf count: ${calories.length}`);

    const top1 = Math.max(...calories);
    calories.splice(calories.indexOf(top1),1);

    const top2 = Math.max(...calories);
    calories.splice(calories.indexOf(top2),1);

    const top3 = Math.max(...calories);
    console.log(`Top 3 elves:`);
    console.log(top1);
    console.log(top2);
    console.log(top3);
    console.log(`Total: ${top1 + top2 + top3}`);

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    return false; // stop reading
  }
});


