import { Scene, WebGLRenderer } from "three";
import Camera from "./camera";
import Figure from "./figure";
import Screen from "./screen";

const scene = new Scene();
const renderer = new WebGLRenderer();

const camera = new Camera();
const figure = new Figure();
const screen = new Screen();

const handleKeyDown = evt => {
  switch (evt.code) {
    case "ArrowDown":
      evt.preventDefault();
      figure.rotate("down");
      break;
    case "ArrowUp":
      evt.preventDefault();
      figure.rotate("up");
      break;
    case "ArrowLeft":
      evt.preventDefault();
      figure.rotate("left");
      break;
    case "ArrowRight":
      evt.preventDefault();
      figure.rotate("right");
      break;
    case "KeyQ":
      camera.togglePosition();
      break;
    case "Space":
      evt.preventDefault();
      screen.newHole(figure.getRandomProjection());
      break;
    default:
      break;
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  figure.update();
  camera.update();
  renderer.render(scene, camera.camera);
};

(() => {
  window.addEventListener("keydown", handleKeyDown);

  screen.newHole(figure.getRandomProjection());

  scene.add(figure.mesh);
  scene.add(screen.mesh);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
})();
