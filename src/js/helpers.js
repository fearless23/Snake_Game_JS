const randInt = function(min = 1, max = boardSize) {
  return Math.floor(Math.random() * max + min);
};

const getFillStyle = function(idx, arrLen) {
  // IDX: 0 --> blue=min,
  //  last index: blue=max
  // rest are in b/w
  const dd = arrLen > 1 ? arrLen - 1 : 1;
  const max = 255;
  const min = 120;
  const fac = ((max - min) * idx) / dd;
  return `rgba(42,152,${fac + min},1)`;
};

const sqPresent = function([nx, ny]) {
  const x = snake.some(([x, y]) => (x === nx && y === ny))
  return !!x
};

const drawSnake = (points = []) => {
  points.forEach(([x, y], idx) => {
    context.fillStyle = getFillStyle(idx, points.length);
    context.fillRect(x - 1, y - 1, 1, 1);
  });
};

const createFood = function() {
  const newFood = [randInt(), randInt()];
  if (!sqPresent(newFood)) {
    food = newFood;
    foodsCreated++;
    return;
  } else {
    createFood();
  }
};

const drawFood = function() {
  context.fillStyle = "#D0D0D0";
  context.fillRect(food[0] - 1, food[1] - 1, 1, 1);
  return;
};

const keyMoves = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0]
};

const checkHitBoundary = function([x, y]) {
  // const newEl = [x, y];
  if (x > 30) x = 1;
  if (y > 30) y = 1;
  if (x === 0) x = 30;
  if (y === 0) y = 30;
  return [x, y];
};

const newElIsEater = function([x, y]) {
  const [a, b] = food;
  if (a === x && b === y) {
    createFood();
    points += 10;
    p.innerText = `${points} Food: ${foodsCreated}/${maxFood}`;
    return true;
  }
  return false;
};

const is90DegChangeInDir = function(moveType) {
  const moveIsH = moveType === "ArrowLeft" || moveType === "ArrowRight";
  const dirIsH = dir === "ArrowLeft" || dir === "ArrowRight";
  return (moveIsH && !dirIsH) || (!moveIsH && dirIsH);
};

const onMove = function(moveType) {
  const [dx, dy] = keyMoves[moveType];
  const [lx, ly] = snake[snake.length - 1];
  const newEl = checkHitBoundary([lx + dx, ly + dy]);
  if (sqPresent(newEl)) return { status: false, msg: "Hit Self" };
  if (!newElIsEater(newEl)) snake.shift();
  context.clearRect(0, 0, canvasSize, canvasSize);
  snake.push(newEl);
  drawSnake(snake);
  drawFood();
  if (foodsCreated >= maxFood) return { status: false, msg: "Game Won" };
  return { status: true, msg: "continue" };
};

//
const startBtn = document.getElementById("btn-start");
const endBtn = document.getElementById("btn-end");
const changeGameState = x => {
  if (x) {
    gameState = "running";
    startBtn.classList.add("disabled");
    startBtn.setAttribute("disabled", true);
    endBtn.classList.remove("disabled");
    endBtn.removeAttribute("disabled");
  } else {
    gameState = "stopped";
    endBtn.classList.add("disabled");
    endBtn.setAttribute("disabled", true);
    startBtn.classList.remove("disabled");
    startBtn.removeAttribute("disabled");
  }
};
