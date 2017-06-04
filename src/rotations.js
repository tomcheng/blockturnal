import { Matrix4, Quaternion } from "three";

const QUARTER_TURN = 0.5 * Math.PI;

export const rotate = (direction, rotation) => {
  const m = new Quaternion();
  const r = new Matrix4();
  const q = new Quaternion();
  m.setFromEuler(rotation);

  switch (direction) {
    case "left": {
      q.setFromRotationMatrix(r.makeRotationY(-QUARTER_TURN));
      m.premultiply(q);
      rotation.setFromQuaternion(m);
      break;
    }
    case "right": {
      q.setFromRotationMatrix(r.makeRotationY(QUARTER_TURN));
      m.premultiply(q);
      rotation.setFromQuaternion(m);
      break;
    }
    case "up": {
      q.setFromRotationMatrix(r.makeRotationX(-QUARTER_TURN));
      m.premultiply(q);
      rotation.setFromQuaternion(m);
      break;
    }
    case "down": {
      q.setFromRotationMatrix(r.makeRotationX(QUARTER_TURN));
      m.premultiply(q);
      rotation.setFromQuaternion(m);
      break;
    }
    default:
      return rotation;
  }
};
