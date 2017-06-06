import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import { SCREEN_SIZE, MATERIAL, INITIAL_SCREEN_DISTANCE } from "./constants";
import { getProjection } from "./projections";
import { getOutline } from "./shapes";
import random from "lodash/random"

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor(coordinates) {
    const projection = getProjection({ axis: ["x", "y", "z"][random(0,2)], coordinates });
    const outline = getOutline(projection);

    const shape = new Shape([
      new Vector2(-0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE),
      new Vector2(-0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE)
    ]);
    const hole = new Path(outline.map(coor => new Vector2(...coor)));

    shape.holes = [hole];

    const mesh = new Mesh(new ExtrudeGeometry(shape, extrudeSettings), MATERIAL);

    mesh.position.set(0, 0, -INITIAL_SCREEN_DISTANCE);

    this.mesh = mesh;
  }
}

export default Screen;
