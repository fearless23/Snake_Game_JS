const randInt = function(min = 1, max = boardSize) {
  return Math.floor(Math.random() * max + min);
};

const getFillStyle = function(idx, arrLen) {
  let x = "#2a9ef";
  if (idx === 0) x = "#4488bf";
  if (idx === arrLen - 1) x = "#0761a9";
  return x;
};

const sqPresent = function([nx, ny]) {
  // tail can move to head...
  for (let i = 1; i < snake.length; ++i) {
    const [x, y] = snake[i];
    if (x === nx && y === ny) {
      return true;
    }
  }
  return false;
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
  const a = dir === "ArrowRight" && moveType === ("ArrowLeft" || "ArrowRight");
  const b = dir === "ArrowLeft" && moveType === ("ArrowRight" || "ArrowLeft");
  const c = dir === "ArrowUp" && moveType === ("ArrowDown" || "ArrowUp");
  const d = dir === "ArrowDown" && moveType === ("ArrowUp" || "ArrowDown");
  return !(a || b || c || d);
};

const onMove = function(moveType) {
  const [dx, dy] = keyMoves[moveType];
  const [lx, ly] = snake[snake.length - 1];
  let newEl = [lx + dx, ly + dy];
  newEl = checkHitBoundary(newEl);

  if (sqPresent(newEl)) {
    return { status: false, msg: "Hit Self" };
  }
  if (!newElIsEater(newEl)) {
    snake.shift();
  }
  context.clearRect(0, 0, canvasSize, canvasSize);
  snake.push(newEl);
  drawSnake(snake);
  drawFood();
  if (foodsCreated >= maxFood) {
    return { status: false, msg: "Game Won" };
  }
  return { status: true };
};
