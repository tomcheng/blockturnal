import { Group, Quaternion, Euler, Mesh, BoxBufferGeometry } from "three";
import max from "lodash/max";
import {
  UNIT_SIZE,
  MATERIAL,
  LOSER_MATERIAL,
  ROTATION_DECAY,
  INITIAL_FIGURE
} from "./constants";
import { rotate } from "./rotations";
import { getDimensions } from "./measurements";
import { getProjection, getRandomProjection } from "./projections";
import { addRandomUnit } from "./addUnit";

const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);

class Figure {
  constructor() {
    let unitCoordinates = [].concat(INITIAL_FIGURE);
    let cubes = [];
    const mesh = new Group();
    const desiredRotation = new Quaternion();

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

      this.maxDimension = max([width, height, depth]);
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
      unitCoordinates = [].concat(INITIAL_FIGURE);
      generateCubesAndMesh();
    };

    this.addBlocks = () => {
      addRandomUnit(unitCoordinates);
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
