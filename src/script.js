// Dimensions and variables for the Canvas
const size = 5;

const c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext("2d");

let rulevalue = 0;
let row;

const initRow = () => {
  row = new Array((c.width - (c.width % size)) / size);
  for (let i = 0; i < row.length; i++) {
    row[i] = 0;
  }
  row[Math.floor(row.length / 2)] = 1;
};

const draw = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  initRow();

  for (let j = 0; j < c.height / size; j++) {
    let y = j * size;
    ctx.moveTo(0, y);
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 1) {
        ctx.fillRect(size * i, y, size, size);
      }
    }
    row = nextGeneration();
  }
};

// Calculate the new state from a neighborhood
const calculateState = (a, b, c) => {
  let ruleset = rulevalue.toString(2);
  while (ruleset.length < 8) {
    ruleset = "0" + ruleset;
  }
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleset[value]);
};

// Calculate the next row of cells
const nextGeneration = () => {
  let nextRow = [];
  let len = row.length;
  for (let i = 0; i < len; i++) {
    let left = row[(i - 1 + len) % len];
    let right = row[(i + 1) % len];
    let state = row[i];
    let nextState = calculateState(left, state, right);
    nextRow[i] = nextState;
  }
  return nextRow;
};

const updateRuleset = (value) => {
  value = parseInt(value);
  if (typeof value === "number" && value <= 256 && value >= 0) {
    rulevalue = value;
    draw();
  } else {
    rulevalue = null;
    console.log("here");
    ctx.clearRect(0, 0, c.width, c.height);
  }
};

const updateDimensions = () => {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  draw();
};

window.onresize = updateDimensions;
