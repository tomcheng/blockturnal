import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import { SCREEN_SIZE, MATERIAL, INITIAL_SCREEN_DISTANCE, UNIT_SIZE } from "./constants";

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor() {
    const shape = new Shape([
      new Vector2(-0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE),
      new Vector2(-0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE)
    ]);

    const hole = new Path([
      new Vector2(-1.5 * UNIT_SIZE, -0.5 * UNIT_SIZE),
      new Vector2(-1.5 * UNIT_SIZE, 1.5 * UNIT_SIZE),
      new Vector2(-0.5 * UNIT_SIZE, 1.5 * UNIT_SIZE),
      new Vector2(-0.5 * UNIT_SIZE, 0.5 * UNIT_SIZE),
      new Vector2(1.5 * UNIT_SIZE, 0.5 * UNIT_SIZE),
      new Vector2(1.5 * UNIT_SIZE, -0.5 * UNIT_SIZE)
    ]);

    shape.holes = [hole];

    this.mesh = new Mesh(new ExtrudeGeometry(shape, extrudeSettings), MATERIAL);
    this.mesh.position.set(0, 0, -INITIAL_SCREEN_DISTANCE);
  }
}

export default Screen;
