import {
  Scene,
  PerspectiveCamera,
  Mesh,
  WebGLRenderer,
  Shape,
  ExtrudeGeometry,
  Vector3
} from "three";
import {
  UNIT_SIZE,
  INITIAL_SCREEN_DISTANCE,
  SCREEN_SIZE,
  MATERIAL
} from "./constants";
import Figure from "./figure";

const scene = new Scene();
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.translateX(-3 * UNIT_SIZE);
camera.translateZ(10 * UNIT_SIZE);
camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));

const figure = new Figure();

const screen = new Shape();
screen.moveTo(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE);
screen.lineTo(0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE);
screen.lineTo(-0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE);
screen.lineTo(-0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE);
screen.lineTo(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE);
const extrudeSettings = { amount: 1, bevelEnabled: false };
const screenGeometry = new ExtrudeGeometry(screen, extrudeSettings);

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

  const screenMesh = new Mesh(screenGeometry, MATERIAL);
  screenMesh.position.set(0, 0, -INITIAL_SCREEN_DISTANCE);

  scene.add(screenMesh);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
})();
