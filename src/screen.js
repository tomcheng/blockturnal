import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import { SCREEN_SIZE, MATERIAL, INITIAL_SCREEN_DISTANCE } from "./constants";
import { getOutline } from "./shapes";
import { isEquivalent } from "./projections";

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor() {
    let projection;
    const shape = new Shape([
      new Vector2(-0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE),
      new Vector2(-0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE)
    ]);
    const mesh = new Mesh(
      new ExtrudeGeometry(shape, extrudeSettings),
      MATERIAL
    );
    mesh.position.set(0, 0, -INITIAL_SCREEN_DISTANCE);

    this.mesh = mesh;

    this.newHole = p => {
      projection = p;
      const outline = getOutline(projection);
      const hole = new Path(outline);
      shape.holes = [hole];
      mesh.geometry = new ExtrudeGeometry(shape, extrudeSettings);
    };

    this.checkFit = figureProjection =>
      isEquivalent(figureProjection, projection);
  }
}

export default Screen;
