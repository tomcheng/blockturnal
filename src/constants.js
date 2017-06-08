import { MeshBasicMaterial, Vector3 } from "three";

export const UNIT_SIZE = 60;

export const INITIAL_SCREEN_DISTANCE = 10000;
export const CAMERA_DISTANCE = 500;
export const CAMERA_OFFSET = 1.5 * UNIT_SIZE;
export const CAMERA_POSITION_DECAY = 0.3;

export const ROTATION_DECAY = 0.4;

export const SCREEN_SIZE = 30 * UNIT_SIZE;
export const MATERIAL = new MeshBasicMaterial({
  color: 0xff7f50,
  wireframe: true
});
export const LOSER_MATERIAL = new MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true
});

export const INITIAL_RATE = 10;
export const ZOOM_RATE = 400;

export const INITIAL_FIGURE = [
  new Vector3(0, 0, 0),
  new Vector3(0, 0, 1),
  new Vector3(0, 1, 0),
  new Vector3(0, 1, 1),
  new Vector3(1, 0, 0),
  new Vector3(1, 0, 1),
  new Vector3(1, 1, 0),
  new Vector3(1, 1, 1)
];
