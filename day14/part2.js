var lineReader = require('line-reader');

const paths = [];
const start = [500, 0];

let scan = [];
let minX = Number.MAX_SAFE_INTEGER;
let maxX = maxY = minY = 0;
let width = height = 0;

const printScan = () => {
  output = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      output += scan[x][y];
    }
    output += "\n";
  }
  output += "\n";
  console.log(output);
}

const addLine = (start, end) => {

  if (start[0] == end[0]) {
    // vertical line
    let startY = Math.min(start[1], end[1]) - minY;
    let endY = Math.max(start[1], end[1]) - minY;
    let x = start[0] - minX;
    for (let y = startY; y <= endY; y++) {
      scan[x][y] = "#";
    }
  } else {
    // horizontal line
    let startX = Math.min(start[0], end[0]) - minX;
    let endX = Math.max(start[0], end[0]) - minX;
    let y = start[1] - minY;
    for (let x = startX; x <= endX; x++) {
      scan[x][y] = "#";
    }
  }
}


lineReader.eachLine('input.txt', function(line, last) {
  let path = line.split(" -> ").map( c => c.split(','))
  paths.push(path);
  minX = Math.min(minX, path.reduce((accumulator, point) => Math.min(accumulator, point[0]), Number.MAX_SAFE_INTEGER));
  //minY = Math.min(minY, path.reduce((accumulator, point) => Math.min(accumulator, point[1]), Number.MAX_SAFE_INTEGER));
  maxX = Math.max(maxX, path.reduce((accumulator, point) => Math.max(accumulator, point[0]), 0));
  maxY = Math.max(maxY, path.reduce((accumulator, point) => Math.max(accumulator, point[1]), 0));

  if (last) {
    let bottom = `${minX-200},${maxY + 2} -> ${maxX + 200},${maxY + 2}`
    let path = bottom.split(" -> ").map( c => c.split(','))
    paths.push(path);
    minX = Math.min(minX, path.reduce((accumulator, point) => Math.min(accumulator, point[0]), Number.MAX_SAFE_INTEGER));
    //minY = Math.min(minY, path.reduce((accumulator, point) => Math.min(accumulator, point[1]), Number.MAX_SAFE_INTEGER));
    maxX = Math.max(maxX, path.reduce((accumulator, point) => Math.max(accumulator, point[0]), 0));
    maxY = Math.max(maxY, path.reduce((accumulator, point) => Math.max(accumulator, point[1]), 0));

    width = maxX - minX + 1;
    height = maxY - minY + 1;

    for (let j = 0; j < width; j++) {
      scan.push(Array(height).fill('.'));
    }
    //printScan();

    // build scan
    paths.forEach( path => {
      for (let i = 1; i < path.length; i++) {
        addLine(path[i-1], path[i]);
      }
    });

    //printScan();

    // simulate
    units = 0;
    while (scan[start[0]-minX][start[1]-minY] == '.') {
      let position = Array.from(start);
      position[0] -= minX;
      position[1] -= minY;
      while (true) {
        if (scan[position[0]][position[1] + 1] == '.') {
          position[1] += 1;
        } else if (scan[position[0] - 1][position[1] + 1] == '.') {
          position[0] -= 1;
          position[1] += 1;
        } else if (scan[position[0] + 1][position[1] + 1] == '.') {
          position[0] += 1;
          position[1] += 1;
        } else {
          scan[position[0]][position[1]] = "o";
          units++;
          //if ([1,2,5,22,24].includes(units)) printScan();
          break;
        }
      }
    }

    //printScan();
    console.log(units);

    return false; // stop reading
  }
});
