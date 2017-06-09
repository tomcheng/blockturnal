import Game from "./game";
import debounce from "lodash/debounce";

const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start-button");
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const highScoreEl = document.getElementById("high-score");
const restartButtonEl = document.getElementById("restart-button");
const scoreEl = document.getElementById("score");

let highScore = localStorage.getItem("high-score") || 0;
let gamePlayed = false;

const handleUpdateScore = score => {
  scoreEl.innerText = score;
};

const handleEndGame = ({ finalScore }) => {
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("high-score", highScore);
  }
  finalScoreEl.innerText = finalScore;
  highScoreEl.innerText = highScore;
  endScreenEl.style.display = "block";
  endScreenEl.className = "inactive";
  requestAnimationFrame(() => {
    endScreenEl.className = "active";
  });
};

const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
  onUpdateScore: handleUpdateScore,
  onEndGame: handleEndGame
});

const startGame = () => {
  startScreenEl.style.display = "none";
  game.start();
  gamePlayed = true;
};

const restartGame = () => {
  endScreenEl.style.display = "none";
  game.reset();
};

startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", restartGame);

window.addEventListener(
  "resize",
  debounce(() => {
    game.resize(window.innerWidth, window.innerHeight);
  }, 300)
);

window.addEventListener("keydown", evt => {
  if (["ArrowDown", "ArrowUp", "Space", "Tab"].includes(evt.code)) {
    evt.preventDefault();
  }

  if (game.isRunning()) {
    switch(evt.code) {
      case "ArrowDown":
        game.rotateFigure("down");
        break;
      case "ArrowUp":
        game.rotateFigure("up");
        break;
      case "ArrowLeft":
        game.rotateFigure("left");
        break;
      case "ArrowRight":
        game.rotateFigure("right");
        break;
      case "BracketLeft":
        game.rotateFigure("counter-clockwise");
        break;
      case "BracketRight":
        game.rotateFigure("clockwise");
        break;
      case "KeyQ":
      case "Tab":
        game.toggleCamera();
        break;
      case "Space":
        game.zoom();
        break;
    }
  } else {
    if (evt.code === "Space") {
      if (gamePlayed) {
        restartGame();
      } else {
        startGame();
      }
    }
  }

});

document.body.appendChild(game.getDomElement());
