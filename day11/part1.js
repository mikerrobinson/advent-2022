var lineReader = require('line-reader');

const MAX_ROUNDS = 20;
const RELAX_FACTOR = 3;

class Monkey {
  inspections = 0;
  constructor(items, operation, test, destIfTrue, destIfFalse) {
    this.items = items;
    this.operation = operation;
    this.test = test;
    this.destIfTrue = destIfTrue;
    this.destIfFalse = destIfFalse;
  }
  processRound() {
    for (let i = 0; i < this.items.length; i++) {
      this.inspections++;
      this.items[i] = this.operation(this.items[i]);
      this.items[i] = Math.floor(this.items[i] / RELAX_FACTOR);
      if (this.items[i] % this.test == 0) {
        monkeys[this.destIfTrue].items.push(this.items[i]);
      } else {
        monkeys[this.destIfFalse].items.push(this.items[i]);
      }
    }
    this.items = [];
  }
}

let monkeys = [];

// test
// monkeys.push(new Monkey([79, 98], (old) => old * 19, 23, 2, 3));
// monkeys.push(new Monkey([54, 65, 75, 74], (old) => old + 6, 19, 2, 0));
// monkeys.push(new Monkey([79, 60, 97], (old) => old * old, 13, 1, 3));
// monkeys.push(new Monkey([74], (old) => old + 3, 17, 0, 1));

// actual
monkeys.push(new Monkey([61], (old) => old * 11, 5, 7, 4));
monkeys.push(new Monkey([76, 92, 53, 93, 79, 86, 81], (old) => old + 4, 2, 2, 6));
monkeys.push(new Monkey([91, 99], (old) => old * 19, 13, 5, 0));
monkeys.push(new Monkey([58, 67, 66], (old) => old * old, 7, 6, 1));
monkeys.push(new Monkey([94, 54, 62, 73], (old) => old + 1, 19, 3, 7));
monkeys.push(new Monkey([59, 95, 51, 58, 58], (old) => old + 3, 11, 0, 4));
monkeys.push(new Monkey([87, 69, 92, 56, 91, 93, 88, 73], (old) => old + 8, 3, 5, 2));
monkeys.push(new Monkey([71, 57, 86, 67, 96, 95], (old) => old + 7, 17, 3, 1));


for (let round = 0; round < MAX_ROUNDS; round++) {
  monkeys.forEach( monkey => monkey.processRound());
  monkeys.forEach( monkey => console.log(monkey.items));
}

monkeys.forEach( monkey => console.log(monkey.inspections));



