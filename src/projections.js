import { Vector2 } from "three";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import random from "lodash/random";

const MAPPINGS = {
  x: c => new Vector2(c.y, c.z),
  y: c => new Vector2(c.x, c.z),
  z: c => new Vector2(c.x, c.y)
};

const flipProjection = flipOrNot => coordinates =>
  flipOrNot ? coordinates.map(c => new Vector2(-c.x, c.y)) : coordinates;

const rotateProjection = angle => coordinates => {
  switch (angle) {
    case 90:
      return coordinates.map(c => new Vector2(-c.y, c.x));
    case 180:
      return coordinates.map(c => new Vector2(-c.x, -c.y));
    case 270:
      return coordinates.map(c => new Vector2(c.y, -c.x));
    default:
      return coordinates;
  }
};

export const getProjection = ({ axis, coordinates }) =>
  uniqWith(coordinates.map(MAPPINGS[axis]), isEqual);

export const getRandomProjection = coordinates => {
  const axis = ["x", "y", "z"][random(0, 2)];
  const flip = random(0, 1) === 1;
  const rotation = [0, 90, 180, 270][random(0, 3)];

  return rotateProjection(rotation)(
    flipProjection(flip)(getProjection({ axis, coordinates }))
  );
};
