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
  endScreenEl.style.display = "none";
  game.reset();
  game.start();
};

startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", startGame);

window.addEventListener(
  "resize",
  debounce(() => {
    game.resize(window.innerWidth, window.innerHeight);
  }, 300)
);

window.addEventListener("keydown", evt => {
  if (["ArrowDown", "ArrowUp", "Space"].includes(evt.code)) {
    evt.preventDefault();
  }

  if (game.isRunning()) {
    game.handleInput(evt.code);
  } else {
    if (evt.code === "Space") {
      startGame();
    }
  }

});

document.body.appendChild(game.getDomElement());
