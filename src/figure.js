import { Group, Quaternion, Euler, Mesh, BoxBufferGeometry, Matrix4, Vector3 } from "three";
import { UNIT_SIZE, MATERIAL, ROTATION_DECAY } from "./constants";
import { rotate } from "./rotations";
import { getDimensions } from "./measurements";

const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);

class Figure {
  constructor() {
    const cubeCoordinates = [
      new Vector3(0, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(-1, 1, 0),
      new Vector3(1, 1, 0),
      new Vector3(1, 1, 1),
    ];
    const mesh = new Group();
    const desiredRotation = new Quaternion();
    const { width, height, depth, x, y, z } = getDimensions(cubeCoordinates);
    const rotationMatrix = new Matrix4();

    desiredRotation.setFromEuler(new Euler(0, 0, 0));

    cubeCoordinates.forEach(coordinates => {
      const cube = new Mesh(unit, MATERIAL);
      cube.position.set(coordinates.x * UNIT_SIZE, coordinates.y * UNIT_SIZE, coordinates.z * UNIT_SIZE);
      cube.translateX(-0.5 * width - x);
      cube.translateY(-0.5 * height - y);
      cube.translateZ(-0.5 * depth - z);
      mesh.add(cube);
    });

    this.mesh = mesh;

    this.coordinates = cubeCoordinates;

    this.rotate = direction => {
      rotate(direction, desiredRotation);
      rotationMatrix.makeRotationFromQuaternion(desiredRotation);
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
