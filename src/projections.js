import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import random from "lodash/random";

const MAPPINGS = {
  x: coor => [coor[1], coor[2]],
  y: coor => [coor[0], coor[2]],
  z: coor => [coor[0], coor[1]]
};

const flipProjection = flipOrNot => coordinates =>
  flipOrNot ? coordinates.map(coor => [-coor[0], coor[1]]) : coordinates;

const rotateProjection = angle => coordinates => {
  switch (angle) {
    case 90:
      return coordinates.map(coor => [-coor[1], coor[0]]);
    case 180:
      return coordinates.map(coor => [-coor[0], -coor[1]]);
    case 270:
      return coordinates.map(coor => [coor[1], -coor[0]]);
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
