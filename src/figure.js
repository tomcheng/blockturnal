import { Group, Quaternion, Euler, Mesh, BoxBufferGeometry } from "three";
import { UNIT_SIZE, MATERIAL, ROTATION_DECAY } from "./constants";
import { rotate } from "./rotations";

const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);
const cubeCoordinates = [[0, 0, 0], [-1, 0, 0], [-1, 1, 0], [1, 0, 0]];

class Figure {
  constructor() {
    const mesh = new Group();
    const desiredRotation = new Quaternion();

    desiredRotation.setFromEuler(new Euler(0, 0, 0));

    cubeCoordinates.forEach(coordinates => {
      const cube = new Mesh(unit, MATERIAL);
      cube.position.set(...coordinates.map(c => UNIT_SIZE * c));
      mesh.add(cube);
    });

    this.mesh = mesh;

    this.rotate = direction => {
      rotate(direction, desiredRotation);
    };

    this.update = () => {
      Quaternion.slerp(
        mesh.quaternion,
        desiredRotation,
        mesh.quaternion,
        ROTATION_DECAY
      );
    };
  }
}

export default Figure;
