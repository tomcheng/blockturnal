import { Matrix4 } from "three";

const QUARTER_TURN = 0.5 * Math.PI;

export const rotate = (direction, rotation) => {
  const m = new Matrix4();
  const r = new Matrix4();
  m.makeRotationFromEuler(rotation);

  switch (direction) {
    case "left": {
      r.makeRotationY(-QUARTER_TURN);
      m.multiply(r);
      rotation.setFromRotationMatrix(m);
      break;
    }
    case "right": {
      r.makeRotationY(QUARTER_TURN);
      m.multiply(r);
      rotation.setFromRotationMatrix(m);
      break;
    }
    case "up": {
      r.makeRotationX(-QUARTER_TURN);
      m.multiply(r);
      rotation.setFromRotationMatrix(m);
      break;
    }
    case "down": {
      r.makeRotationX(QUARTER_TURN);
      m.multiply(r);
      rotation.setFromRotationMatrix(m);
      break;
    }
    default:
      return rotation;
  }
};
