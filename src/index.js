import Game from "./game";
import debounce from "lodash/debounce";

const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start-button");
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const restartButtonEl = document.getElementById("restart-button");
const scoreEl = document.getElementById("score");

const handleUpdateScore = score => {
  scoreEl.innerText = score;
};

const handleEndGame = ({ finalScore }) => {
  endScreenEl.style.display = "flex";
  finalScoreEl.innerText = finalScore;
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
