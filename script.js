const size = 10;

let row = new Array(710 / 10);
let ruleset = [0, 1, 0, 1, 0, 1, 1, 0];

const initRow = () => {
  for (let i = 0; i < row.length; i++) {
    row[i] = Math.random() < 0.5 ? 0 : 1;
  }
};

const draw = () => {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");

  for (let j = 0; j < 500 / 10; j++) {
    row = nextGeneration();
    let x = 0;
    let y = j * size;
    ctx.moveTo(x, y);
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 1) {
        ctx.fillRect(x, y, size, size);
      }
      x += size;
    }
  }
};

const calculateState = (left, right, state) => {
  let neighborhood = "" + left + right + state;
  let value = 7 - parseInt(neighborhood, 2);
  return ruleset[value];
};

const nextGeneration = () => {
  let nextRow = [];
  for (let i = 0; i < row.length; i++) {
    if (i === 0 || i === row.length - 1) {
      nextRow[i] = row[i];
      continue;
    }
    let left = row[i - 1];
    let right = row[i + 1];
    let state = row[i];
    let nextState = calculateState(left, right, state);
    nextRow[i] = nextState;
  }
  return nextRow;
};

initRow();

draw();
