import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from "three";
import { UNIT_SIZE, INITIAL_SCREEN_DISTANCE } from "./constants";
import Figure from "./figure";
import Screen from "./screen";

const scene = new Scene();
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.translateX(-3 * UNIT_SIZE);
camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));

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
    default:
      break;
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  figure.update();
  renderer.render(scene, camera);
};

(() => {
  camera.position.z = 1000;
  window.addEventListener("keydown", handleKeyDown);

  scene.add(figure.mesh);
  scene.add(screen.mesh);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
})();
