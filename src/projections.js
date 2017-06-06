import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

const MAPPINGS = {
  x: coor => [coor[1], coor[2]],
  y: coor => [coor[0], coor[2]],
  z: coor => [coor[0], coor[1]]
};

export const getProjection = ({ axis, coordinates }) =>
  uniqWith(coordinates.map(MAPPINGS[axis]), isEqual);
