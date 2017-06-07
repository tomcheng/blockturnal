import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import { SCREEN_SIZE, MATERIAL, INITIAL_RATE, ZOOM_RATE } from "./constants";
import { getOutline } from "./shapes";
import { isEquivalent } from "./projections";

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor() {
    let projection;
    let zoomCallback = null;
    let distanceToZoom = null;
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

    this.mesh = mesh;

    this.moveTo = distance => {
      mesh.position.set(0, 0, distance);
    };

    this.zoom = distance => {
      distanceToZoom = distance;

      return new Promise(resolve => {
        zoomCallback = resolve;
      });
    };

    this.setNewHole = p => {
      projection = p;
      const outline = getOutline(projection);
      const hole = new Path(outline);
      shape.holes = [hole];
      mesh.geometry = new ExtrudeGeometry(shape, extrudeSettings);
    };

    this.checkFit = figureProjection =>
      isEquivalent(figureProjection, projection);

    this.update = () => {
      if (distanceToZoom) {
        mesh.translateZ(ZOOM_RATE);
        distanceToZoom -= ZOOM_RATE;
        if (distanceToZoom <= 0) {
          distanceToZoom = null;
          zoomCallback();
          zoomCallback = null;
        }
      } else {
        mesh.translateZ(INITIAL_RATE);
      }
    }
  }
}

export default Screen;
