import { Scene, WebGLRenderer } from "three";
import Camera from "./camera";
import Figure from "./figure";
import ScreenManager from "./screenManager";

const scene = new Scene();
const renderer = new WebGLRenderer();

const camera = new Camera();
const figure = new Figure();
const screenManager = new ScreenManager();

let ended = false;

const handleKeyDown = evt => {
  if (["ArrowDown", "ArrowUp", "Space"].includes(evt.code)) {
    evt.preventDefault();
  }

  if (ended) {
    if (evt.code === "Space") {
      figure.reset();
      screenManager.reset();
      screenManager.setNewHole(figure.getRandomProjection());
      ended = false;
    }
    return;
  }

  switch (evt.code) {
    case "ArrowDown":
      figure.rotate("down");
      break;
    case "ArrowUp":
      figure.rotate("up");
      break;
    case "ArrowLeft":
      figure.rotate("left");
      break;
    case "ArrowRight":
      figure.rotate("right");
      break;
    case "BracketLeft":
      figure.rotate("counter-clockwise");
      break;
    case "BracketRight":
      figure.rotate("clockwise");
      break;
    case "KeyQ":
      camera.togglePosition();
      break;
    case "Space":
      screenManager.zoom();
      break;
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  if (
    screenManager.isAtFigure() &&
    !screenManager.checkFit(figure.getCurrentProjection())
  ) {
    figure.turnRed();
    screenManager.stop();
    ended = true;
  }

  if (screenManager.isPastFigure()) {
    figure.addBlocks();
    camera.updateOffset(0.5 * figure.maxDimension);
    screenManager.setNextScreen(figure.getRandomProjection());
  }

  figure.update();
  camera.update();
  screenManager.update();
  renderer.render(scene, camera.camera);
};

(() => {
  window.addEventListener("keydown", handleKeyDown);

  screenManager.setNewHole(figure.getRandomProjection());

  scene.add(figure.mesh);
  screenManager.getScreens().forEach(s => {
    scene.add(s.mesh);
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
})();
