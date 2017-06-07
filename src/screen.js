import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import { SCREEN_SIZE, MATERIAL, INITIAL_SCREEN_DISTANCE } from "./constants";
import { getRandomProjection } from "./projections";
import { getOutline } from "./shapes";

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor(figure) {
    const shape = new Shape([
      new Vector2(-0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE),
      new Vector2(-0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE),
      new Vector2(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE)
    ]);
    const mesh = new Mesh(new ExtrudeGeometry(shape, extrudeSettings), MATERIAL);
    mesh.position.set(0, 0, -INITIAL_SCREEN_DISTANCE);

    this.getNewHole = () => {
      const projection = getRandomProjection(figure.unitCoordinates);
      const outline = getOutline(projection);
      const hole = new Path(outline);
      shape.holes = [hole];
      mesh.geometry = new ExtrudeGeometry(shape, extrudeSettings);
    };

    this.mesh = mesh;

    this.getNewHole();
  }
}

export default Screen;
