import { PerspectiveCamera, Vector3 } from "three";
import {
  INITIAL_SCREEN_DISTANCE,
  CAMERA_POSITION_DECAY,
  CAMERA_DISTANCE,
  CAMERA_OFFSET,
  UNIT_SIZE
} from "./constants";

class Camera {
  constructor() {
    let desiredPosition = "left";
    let offset = UNIT_SIZE + CAMERA_OFFSET;
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      INITIAL_SCREEN_DISTANCE + CAMERA_DISTANCE + 10
    );

    camera.translateX(-offset);
    camera.translateY(0.5 * offset);
    camera.translateZ(CAMERA_DISTANCE);
    camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));

    this.camera = camera;

    this.togglePosition = () => {
      desiredPosition = desiredPosition === "left" ? "right" : "left";
    };

    this.updateOffset = additionalOffset => {
      offset = additionalOffset + CAMERA_OFFSET;
    };

    this.update = () => {
      camera.translateX(
        -CAMERA_POSITION_DECAY *
          (camera.position.x - (desiredPosition === "left" ? -offset : offset))
      );
      camera.translateY(
        -CAMERA_POSITION_DECAY * (camera.position.y - 0.5 * offset)
      );
    };
  }
}

export default Camera;
