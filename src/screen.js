import { Shape, ExtrudeGeometry, Mesh } from "three";
import { SCREEN_SIZE, MATERIAL, INITIAL_SCREEN_DISTANCE } from "./constants";

const extrudeSettings = { amount: 1, bevelEnabled: false };

class Screen {
  constructor() {
    const screen = new Shape();
    screen.moveTo(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE);
    screen.lineTo(0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE);
    screen.lineTo(-0.5 * SCREEN_SIZE, -0.5 * SCREEN_SIZE);
    screen.lineTo(-0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE);
    screen.lineTo(0.5 * SCREEN_SIZE, 0.5 * SCREEN_SIZE);

    this.mesh = new Mesh(new ExtrudeGeometry(screen, extrudeSettings), MATERIAL);
    this.mesh.position.set(0, 0, -INITIAL_SCREEN_DISTANCE);
  }
}

export default Screen;
