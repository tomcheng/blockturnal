import {
  Scene,
  PerspectiveCamera,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
  WebGLRenderer,
  Euler,
  Quaternion
} from "three";
import { rotate } from "./rotations";

const UNIT_SIZE = 80;
const ROTATION_DECAY = 0.5;

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
const desiredRotation = new Quaternion();
desiredRotation.setFromEuler(new Euler(0,0,0));

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
      rotate("down", desiredRotation);
      break;
    case "ArrowUp":
      evt.preventDefault();
      rotate("up", desiredRotation);
      break;
    case "ArrowLeft":
      evt.preventDefault();
      rotate("left", desiredRotation);
      break;
    case "ArrowRight":
      evt.preventDefault();
      rotate("right", desiredRotation);
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

  Quaternion.slerp(figure.quaternion, desiredRotation, figure.quaternion, ROTATION_DECAY);

  renderer.render(scene, camera);
};

init();
animate();
