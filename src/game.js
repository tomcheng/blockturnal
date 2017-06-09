import * as T from "three";
import { INITIAL_SCREEN_DISTANCE } from "./constants";
import Camera from "./camera";
import Figure from "./figure";
import ScreenManager from "./screenManager";

const scene = new T.Scene();
const renderer = new T.WebGLRenderer();
const camera = new Camera();
const figure = new Figure();
const screenManager = new ScreenManager();
let requestId = null;
let score = 0;

class Game {
  constructor({ width, height, onUpdateScore, onEndGame }) {
    this.onUpdateScore = onUpdateScore;
    this.onEndGame = onEndGame;

    this.onUpdateScore(0);

    camera.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammeOutput = true;
    renderer.setSize(width, height);

    scene.background = new T.Color(0x8bd9f2);
    scene.fog = new T.Fog(0x8bd9f2, 1, 1.5 * INITIAL_SCREEN_DISTANCE);

    scene.add(new T.AmbientLight(0x404040));

    const light = new T.DirectionalLight();
    light.position.set(-3, 5, 7);
    scene.add(light);

    scene.add(figure.mesh);

    screenManager.setNewHole(figure.getRandomProjection());
    screenManager.getScreens().forEach(s => {
      scene.add(s.mesh);
    });
  }

  animate = () => {
    requestId = requestAnimationFrame(this.animate);

    if (
      screenManager.isAtFigure() &&
      !screenManager.checkFit(figure.getCurrentProjection())
    ) {
      figure.turnRed();
      screenManager.stop();
      cancelAnimationFrame(requestId);
      requestId = null;
      this.onEndGame({ finalScore: score });
    }

    if (screenManager.isPastFigure()) {
      score += 1;
      this.onUpdateScore(score);

      figure.addBlocks();
      camera.updateOffset(0.5 * figure.maxDimension);
      screenManager.setNextScreen(figure.getRandomProjection());
    }

    figure.update();
    camera.update();
    screenManager.update();
    renderer.render(scene, camera.camera);
  };

  getDomElement = () => renderer.domElement;

  isRunning = () => !!requestId;

  reset = () => {
    score = 0;
    this.onUpdateScore(score);

    figure.reset();
    screenManager.reset();
    screenManager.setNewHole(figure.getRandomProjection());
    this.animate();
  };

  start = () => {
    this.animate();
  };

  resize = (width, height) => {
    camera.setSize(width, height);
    renderer.setSize(width, height);
  };

  rotateFigure = direction => {
    figure.rotate(direction);
  };

  toggleCamera = () => {
    camera.togglePosition();
  };

  zoom = () => {
    screenManager.zoom();
  };
}

export default Game;
