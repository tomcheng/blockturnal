import { UNIT_SIZE } from "./constants";

export const getDimensions = cubeCoordinates => {
  let xMin = null,
    xMax = null,
    yMin = null,
    yMax = null,
    zMin = null,
    zMax = null;

  cubeCoordinates.forEach(coor => {
    if (xMin === null || coor[0] < xMin) {
      xMin = coor[0];
    }
    if (yMin === null || coor[1] < yMin) {
      yMin = coor[1];
    }
    if (zMin === null || coor[2] < zMin) {
      zMin = coor[2];
    }
    if (xMax === null || coor[0] > xMax) {
      xMax = coor[0];
    }
    if (yMax === null || coor[1] > yMax) {
      yMax = coor[1];
    }
    if (zMax === null || coor[2] > zMax) {
      zMax = coor[2];
    }
  });

  return {
    width: (xMax - xMin + 1) * UNIT_SIZE,
    height: (yMax - yMin + 1) * UNIT_SIZE,
    depth: (zMax - zMin + 1) * UNIT_SIZE,
    x: xMin * UNIT_SIZE - 0.5 * UNIT_SIZE,
    y: yMin * UNIT_SIZE - 0.5 * UNIT_SIZE,
    z: zMin * UNIT_SIZE - 0.5 * UNIT_SIZE
  };
};
