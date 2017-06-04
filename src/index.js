import {
  Scene,
  PerspectiveCamera,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
  WebGLRenderer
} from "three";
import { rotate } from "./rotations";

const UNIT_SIZE = 80;
const ROTATION_DECAY = 0.2;

const scene = new Scene();
const renderer = new WebGLRenderer();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);
const material = new MeshBasicMaterial({ color: 0xff7f50, wireframe: true });
const figure = new Group();
let desiredRotation = { x: 0, y: 0, z: 0 };

const cubeCoordinates = [[0, 0, 0], [-1, 0, 0], [-1, 1, 0], [1, 0, 0]];

const getPosition = coor => [
  UNIT_SIZE * coor[0],
  UNIT_SIZE * coor[1],
  UNIT_SIZE * coor[2]
];

const handleKeyDown = evt => {
  switch (evt.code) {
    case "ArrowDown":
      evt.preventDefault();
      desiredRotation = rotate("down", desiredRotation);
      break;
    case "ArrowUp":
      evt.preventDefault();
      desiredRotation = rotate("up", desiredRotation);
      break;
    case "ArrowLeft":
      evt.preventDefault();
      desiredRotation = rotate("left", desiredRotation);
      break;
    case "ArrowRight":
      evt.preventDefault();
      desiredRotation = rotate("right", desiredRotation);
      break;
    default:
      break;
  }
};

const init = () => {
  camera.position.z = 1000;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("keydown", handleKeyDown);

  cubeCoordinates.forEach(coordinates => {
    const cube = new Mesh(unit, material);
    cube.position.set(...getPosition(coordinates));
    figure.add(cube);
  });

  scene.add(figure);
};

const animate = () => {
  requestAnimationFrame(animate);

  figure.rotation.x += ROTATION_DECAY * (desiredRotation.x - figure.rotation.x);
  figure.rotation.y += ROTATION_DECAY * (desiredRotation.y - figure.rotation.y);
  figure.rotation.z += ROTATION_DECAY * (desiredRotation.z - figure.rotation.z);

  renderer.render(scene, camera);
};

init();
animate();
