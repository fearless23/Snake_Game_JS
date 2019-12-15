// Set Canvas Size
const canvas = document.getElementById("canvas");
canvas.width = canvasSize;
canvas.height = canvasSize;

// Set Scale
const context = canvas.getContext("2d");
const scale = canvasSize / boardSize;
context.scale(scale, scale);
// Grab Els
const p = document.getElementById("points");
const gameEmd = document.getElementById("gameEnd");
const info = document.getElementById("info");

let x;
const startGame = () => {
  if (gameState === "running") return;
  setInitState();
  drawFood();
  drawSnake(snake);
  p.innerText = points;
  x = setInterval(() => {
    const { status, msg } = onMove(dir);
    if (!status) {
      gameState = "stopped"
      p.innerText = `${points} - ${msg}`;
      clearInterval(x);
    }
  }, 150);
};

const stopGame = () => {
  if (gameState === "stopped") return;
  clearInterval(x);
  context.clearRect(0, 0, canvasSize, canvasSize);
  gameState = "stopped";
};

document.addEventListener("keydown", function(event) {
  if (is90DegChangeInDir(event.key)) dir = event.key;
});
