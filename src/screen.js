import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import {
  SCREEN_SIZE,
  MATERIAL,
  INITIAL_RATE,
  ZOOM_RATE,
  CAMERA_DISTANCE
} from "./constants";
import { getOutline } from "./shapes";
import { isEquivalent } from "./projections";

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor() {
    let projection;
    let isZooming = false;
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

    this.zoom = () => {
      isZooming = true;
    };

    this.setNewHole = p => {
      isZooming = false;
      projection = p;
      const outline = getOutline(projection);
      const hole = new Path(outline);
      shape.holes = [hole];
      mesh.geometry = new ExtrudeGeometry(shape, extrudeSettings);
    };

    this.checkFit = figureProjection =>
      isEquivalent(figureProjection, projection);

    this.isAtFigure = () =>
      isZooming
        ? mesh.position.z + ZOOM_RATE >= 0
        : mesh.position.z + INITIAL_RATE >= 0;

    this.isOffCamera = () => mesh.position.z > CAMERA_DISTANCE;

    this.update = () => {
      if (mesh.position.z >= 0) {
        isZooming = false;
      }

      if (isZooming) {
        mesh.translateZ(ZOOM_RATE);
      } else {
        mesh.translateZ(INITIAL_RATE);
      }
    };
  }
}

export default Screen;
