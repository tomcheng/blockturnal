import { PerspectiveCamera, Vector3 } from "three";
import {
  INITIAL_SCREEN_DISTANCE,
  CAMERA_OFFSET,
  CAMERA_POSITION_DECAY,
  CAMERA_DISTANCE
} from "./constants";

const POSITIONS = {
  left: -CAMERA_OFFSET,
  right: CAMERA_OFFSET
};

class Camera {
  constructor() {
    let desiredPosition = "left";
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      INITIAL_SCREEN_DISTANCE + CAMERA_DISTANCE + 10,
    );

    camera.translateX(POSITIONS[desiredPosition]);
    camera.translateZ(CAMERA_DISTANCE);
    camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));

    this.camera = camera;

    this.togglePosition = () => {
      desiredPosition = desiredPosition === "left" ? "right" : "left";
    };

    this.update = () => {
      camera.translateX(
        -CAMERA_POSITION_DECAY *
          (camera.position.x - POSITIONS[desiredPosition])
      );
    };
  }
}

export default Camera;
