import Game from "./game";
import debounce from "lodash/debounce";

const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start-button");
const scoreEl = document.getElementById("score");

const handleUpdateScore = score => {
  scoreEl.innerText = score;
};

const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
  onUpdateScore: handleUpdateScore
});

startButtonEl.addEventListener("click", () => {
  startScreenEl.style.display = "none";
  game.start();
});

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

  game.handleInput(evt.code);
});

document.body.appendChild(game.getDomElement());
