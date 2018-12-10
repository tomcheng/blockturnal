import { PerspectiveCamera, Vector3 } from "three";
import {
  INITIAL_SCREEN_DISTANCE,
  CAMERA_POSITION_DECAY,
  INITIAL_CAMERA_DISTANCE,
} from "./constants";

const camera = new PerspectiveCamera(
  75,
  1,
  1,
  INITIAL_SCREEN_DISTANCE + INITIAL_CAMERA_DISTANCE + 10
);
let side = "left";
let orientation;

class Camera {
  constructor() {
    this.distance = INITIAL_CAMERA_DISTANCE;
    camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));

    this.camera = camera;
  }

  togglePosition = () => {
    side = side === "left" ? "right" : "left";
  };

  setOffset = offset => {
    this.offset = offset;
  };

  setDistance = distance => {
    this.distance = distance;
  };

  update = () => {
    const desiredX = orientation === "landscape"
      ? side === "left" ? -this.offset : this.offset
      : 0;
    const desiredY = orientation === "landscape" ? 0.5 * this.offset : this.offset;
    camera.translateZ(CAMERA_POSITION_DECAY * (this.distance - camera.position.z));
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
