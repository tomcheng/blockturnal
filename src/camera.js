import { PerspectiveCamera, Vector3 } from "three";
import {
  INITIAL_SCREEN_DISTANCE,
  CAMERA_POSITION_DECAY,
  CAMERA_DISTANCE,
  CAMERA_OFFSET,
  UNIT_SIZE
} from "./constants";

const camera = new PerspectiveCamera(
  75,
  1,
  1,
  INITIAL_SCREEN_DISTANCE + CAMERA_DISTANCE + 10
);
let side = "left";
let offset = UNIT_SIZE + CAMERA_OFFSET;
let orientation;

class Camera {
  constructor() {
    camera.translateZ(CAMERA_DISTANCE);
    camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));

    this.camera = camera;
  }

  togglePosition = () => {
    side = side === "left" ? "right" : "left";
  };

  updateOffset = additionalOffset => {
    offset = additionalOffset + CAMERA_OFFSET;
  };

  update = () => {
    const desiredX = orientation === "landscape"
      ? side === "left" ? -offset : offset
      : 0;
    const desiredY = orientation === "landscape" ? 0.5 * offset : offset;
    camera.translateX(CAMERA_POSITION_DECAY * (desiredX - camera.position.x));
    camera.translateY(CAMERA_POSITION_DECAY * (desiredY - camera.position.y));
  };

  setSize = (width, height) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    orientation = height > width ? "portrait" : "landscape";
    if (orientation === "portrait") {
      camera.setViewOffset(width, height, 0, 0.2 * height, width, height);
    } else {
      camera.setViewOffset(width, height, 0, 0, width, height);
    }
  };
}

export default Camera;
