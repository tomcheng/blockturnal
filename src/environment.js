class Environment {
  constructor () {
    const scoreEl = document.getElementById("score");
    let score = 0;

    scoreEl.innerText = score;

    this.updateScore = () => {
      score += 1;
      scoreEl.innerText = score;
    };

    this.resetScore = () => {
      score = 0;
      scoreEl.innerText = score;
    };
  }
}

export default Environment;
