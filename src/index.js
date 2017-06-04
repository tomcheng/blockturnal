import {
  Scene,
  PerspectiveCamera,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
  WebGLRenderer
} from "three";

const UNIT_SIZE = 80;

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
let xRotation = 0;
let yRotation = 0;

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
      xRotation = xRotation + 1;
      break;
    case "ArrowUp":
      evt.preventDefault();
      xRotation = xRotation - 1;
      break;
    case "ArrowLeft":
      evt.preventDefault();
      yRotation = yRotation - 1;
      break;
    case "ArrowRight":
      evt.preventDefault();
      yRotation = yRotation + 1;
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

  figure.rotation.x += 0.2 * (xRotation * 0.5 * Math.PI - figure.rotation.x);
  figure.rotation.y += 0.2 * (yRotation * 0.5 * Math.PI - figure.rotation.y);

  renderer.render(scene, camera);
};

init();
animate();
