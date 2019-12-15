// Board Size = 30x30;
const boardSize = 30;
const canvasSize = 600;
let gameState = "stopped";
const maxFood = 20;
let snake;
let points;
let dir;
let food;
let foodsCreated;

const setInitState = () => {
  snake = [
    [2, 2],
    [2, 3],
    [3, 3],
    [4, 3]
  ];

  points = 0;
  dir = "ArrowRight";
  gameState = "running";
  food = [14, 14];
  foodsCreated = 0;
};
