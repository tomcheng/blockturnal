import {
  Group,
  Quaternion,
  Euler,
  Mesh,
  BoxBufferGeometry,
  Vector3
} from "three";
import {
  UNIT_SIZE,
  MATERIAL,
  LOSER_MATERIAL,
  ROTATION_DECAY
} from "./constants";
import { rotate } from "./rotations";
import { getDimensions } from "./measurements";
import { getProjection, getRandomProjection } from "./projections";

const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);

class Figure {
  constructor() {
    const unitCoordinates = [
      new Vector3(-1, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 1, 0),
      new Vector3(0, 0, 1)
    ];
    const mesh = new Group();
    const desiredRotation = new Quaternion();
    let cubes = [];

    desiredRotation.setFromEuler(new Euler(0, 0, 0));

    const generateCubesAndMesh = () => {
      cubes.forEach(cube => {
        mesh.remove(cube);
      });

      const { width, height, depth, x, y, z } = getDimensions(unitCoordinates);

      cubes = unitCoordinates.map(c => {
        const cube = new Mesh(unit, MATERIAL);
        cube.position.set(c.x * UNIT_SIZE, c.y * UNIT_SIZE, c.z * UNIT_SIZE);
        cube.translateX(-0.5 * width - x);
        cube.translateY(-0.5 * height - y);
        cube.translateZ(-0.5 * depth - z);
        return cube;
      });

      cubes.forEach(cube => {
        mesh.add(cube);
      });
    };

    generateCubesAndMesh();

    this.mesh = mesh;

    this.rotate = direction => {
      rotate(direction, desiredRotation);
    };

    this.getCurrentProjection = () => {
      const rotatedCoordinates = unitCoordinates.map(c =>
        c.clone().applyQuaternion(desiredRotation).round()
      );
      return getProjection({ axis: "z", coordinates: rotatedCoordinates });
    };

    this.getRandomProjection = () => {
      return getRandomProjection(unitCoordinates);
    };

    this.turnRed = () => {
      cubes.forEach(cube => {
        cube.material = LOSER_MATERIAL;
      });
    };

    this.reset = () => {
      cubes.forEach(cube => {
        cube.material = MATERIAL;
      });
    };

    this.addBlocks = () => {
      unitCoordinates.push(new Vector3(2, 0, 0));
      generateCubesAndMesh();
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
