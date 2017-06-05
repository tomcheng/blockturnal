import {
  Group,
  Quaternion,
  Euler,
  Mesh,
  BoxBufferGeometry
} from "three";
import { UNIT_SIZE, MATERIAL, ROTATION_DECAY } from "./constants";
import { rotate } from "./rotations";

const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);

const cubeCoordinates = [[0, 0, 0], [-1, 0, 0], [-1, 1, 0], [1, 0, 0]];

const getPosition = coor => [
  UNIT_SIZE * coor[0],
  UNIT_SIZE * coor[1],
  UNIT_SIZE * coor[2]
];

class Figure {
  constructor() {
    this.mesh = new Group();

    cubeCoordinates.forEach(coordinates => {
      const cube = new Mesh(unit, MATERIAL);
      cube.position.set(...getPosition(coordinates));
      this.mesh.add(cube);
    });

    this.desiredRotation = new Quaternion();
    this.desiredRotation.setFromEuler(new Euler(0, 0, 0));
  }

  rotate(direction) {
    rotate(direction, this.desiredRotation);
  }

  update() {
    Quaternion.slerp(
      this.mesh.quaternion,
      this.desiredRotation,
      this.mesh.quaternion,
      ROTATION_DECAY
    );

  }
}

export default Figure;
