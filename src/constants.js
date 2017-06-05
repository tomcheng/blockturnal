import { MeshBasicMaterial } from "three";

export const UNIT_SIZE = 60;

export const INITIAL_SCREEN_DISTANCE = 4000;
export const CAMERA_OFFSET = 2.8 * UNIT_SIZE;
export const CAMERA_POSITION_DECAY = 0.2;

export const ROTATION_DECAY = 0.4;

export const SCREEN_SIZE = 12 * UNIT_SIZE;
export const MATERIAL = new MeshBasicMaterial({
  color: 0xff7f50,
  wireframe: true
});
