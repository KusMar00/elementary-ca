const size = 5;
const width = 800;
const height = 700;

let rulevalue = 0;
let row = new Array(width / size).fill(0);

const c = document.getElementById("canvas");
c.width = width;
c.height = height;
const ctx = c.getContext("2d");

const initRow = () => {
  for (let i = 0; i < row.length; i++) {
    row[i] = 0;
  }
  row[Math.floor(row.length / 2)] = 1;
};

const draw = () => {
  initRow();
  clearCanvas();
  for (let j = 0; j < height / size; j++) {
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

const calculateState = (a, b, c) => {
  let ruleset = rulevalue.toString(2);
  while (ruleset.length < 8) {
    ruleset = "0" + ruleset;
  }
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleset[value]);
};

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

const clearCanvas = () => {
  ctx.clearRect(0, 0, c.width, c.height);
};

const updateRuleset = (value) => {
  value = parseInt(value);
  if (typeof value === "number" && value <= 256 && value >= 0) {
    rulevalue = value;
  } else {
    rulevalue = 0;
    console.log("here");
  }
  draw();
};
