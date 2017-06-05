import { PerspectiveCamera, Vector3 } from "three";
import {
  INITIAL_SCREEN_DISTANCE,
  CAMERA_OFFSET,
  CAMERA_POSITION_DECAY
} from "./constants";

const POSITIONS = {
  left: -CAMERA_OFFSET,
  right: CAMERA_OFFSET
};

class Camera {
  constructor() {
    this.desiredPosition = "left";

    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.translateX(POSITIONS[this.desiredPosition]);
    this.camera.translateZ(1000);
    this.camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));
  }

  togglePosition() {
    this.desiredPosition = this.desiredPosition === "left" ? "right" : "left";
  }

  update() {
    this.camera.translateX(
      -CAMERA_POSITION_DECAY *
        (this.camera.position.x - POSITIONS[this.desiredPosition])
    );
  }
}

export default Camera;
