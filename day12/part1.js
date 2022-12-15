var lineReader = require('line-reader');

const input = [];
const vertices = [];
let start = end = null;

class Vertex {
  distance = Number.MAX_SAFE_INTEGER;
  prev = null;
  edges = [];
  visited = false;
  constructor(x,y,height) {
    this.x = x;
    this.y = y;
    this.height = height;
  }
  id() {
    return `x${this.x}y${y}`;
  }
}


let row = 0;
lineReader.eachLine('input.txt', function(line, last) {
  input.push(line.split("").map( (c, i) => new Vertex(i, row, c.charCodeAt(0))));
  row++;

  if (last) {

console.log(input);

// build graph
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    console.log(`HERE: ${x}, ${y}`);

    if (input[y][x].height == 83) {
      input[y][x].height = 97;
      input[y][x].distance = 0;
      start = input[y][x];
    } else if (input[y][x].height == 69) {
      input[y][x].height = 122;
      end = input[y][x];
    }

    if (x > 0 && input[y][x].height >= input[y][x-1].height-1) input[y][x].edges.push(input[y][x-1])
    if (x < input[y].length - 1 && input[y][x].height >= input[y][x+1].height-1) input[y][x].edges.push(input[y][x+1])
    if (y > 0 && input[y][x].height >= input[y-1][x].height-1) input[y][x].edges.push(input[y-1][x])
    if (y < input.length - 1 && input[y][x].height >= input[y+1][x].height-1) input[y][x].edges.push(input[y+1][x])

    vertices.push(input[y][x]);
  }
}

while (vertices.length > 0) {
  vertices.sort((a,b) => b.distance - a.distance);
  let vertex = vertices.pop();
  if (vertex == end) {
    break;
  }
  vertex.visited = true;

  for (const neighbor of vertex.edges) {
    if (!neighbor.visited) {
      if (neighbor.distance > vertex.distance + 1) {
        neighbor.distance = vertex.distance + 1;
        neighbor.prev = vertex;
      }
    }
  }
}

console.log(end.distance);

    return false; // stop reading
  }
});
console.log("HELLO2");


//let current = end;
//while (current.prev )
