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
  switch (evt.code) {
    case "ArrowDown":
      evt.preventDefault();
      if (!ended) {
        figure.rotate("down");
      }
      break;
    case "ArrowUp":
      evt.preventDefault();
      if (!ended) {
        figure.rotate("up");
      }
      break;
    case "ArrowLeft":
      evt.preventDefault();
      if (!ended) {
        figure.rotate("left");
      }
      break;
    case "ArrowRight":
      evt.preventDefault();
      if (!ended) {
        figure.rotate("right");
      }
      break;
    case "KeyQ":
      if (!ended) {
        camera.togglePosition();
      }
      break;
    case "Space":
      evt.preventDefault();

      if (ended) {
        figure.reset();
        screenManager.reset();
        screenManager.setNewHole(figure.getRandomProjection());
        ended = false;
        return;
      }

      if (
        screenManager.checkFit(figure.getCurrentProjection())
      ) {
        screenManager
          .zoom()
          .then(() => screenManager.setNewHole(figure.getRandomProjection()));
      } else {
        screenManager.zoomAndStop().then(() => {
          figure.turnRed();
          ended = true;
        });
      }

      break;
    default:
      break;
  }
};

const animate = () => {
  requestAnimationFrame(animate);
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
