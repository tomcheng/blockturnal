import { UNIT_SIZE } from "./constants";

const center = vertices => {
  let xMin = null,
    xMax = null,
    yMin = null,
    yMax = null;

  vertices.forEach(vertex => {
    if (xMin === null || vertex[0] < xMin) {
      xMin = vertex[0];
    }
    if (yMin === null || vertex[1] < yMin) {
      yMin = vertex[1];
    }
    if (xMax === null || vertex[0] > xMax) {
      xMax = vertex[0];
    }
    if (yMax === null || vertex[1] > yMax) {
      yMax = vertex[1];
    }
  });

  const xOffset = -xMin - 0.5 * (xMax - xMin);
  const yOffset = -yMin - 0.5 * (yMax - yMin);

  return vertices.map(vertex => [vertex[0] + xOffset, vertex[1] + yOffset]);
};

export const getOutline = coordinates => {
  const vertices = [];
  let currentPosition = [0, 0], currentDirection = "right";

  const hasCoordinates = (x, y) =>
    coordinates.some(coor => coor[0] === x && coor[1] === y);

  const getRight = () => {
    const [x, y] = currentPosition;
    switch (currentDirection) {
      case "right":
        return [x + 1, y - 1];
      case "up":
        return [x + 1, y + 1];
      case "left":
        return [x - 1, y + 1];
      case "down":
        return [x - 1, y - 1];
    }
  };

  const getStraight = () => {
    const [x, y] = currentPosition;
    switch (currentDirection) {
      case "right":
        return [x + 1, y];
      case "up":
        return [x, y + 1];
      case "left":
        return [x - 1, y];
      case "down":
        return [x, y - 1];
    }
  };

  const turnRight = () => {
    const [x, y] = currentPosition;
    switch (currentDirection) {
      case "right":
        vertices.push([(x + 1) * UNIT_SIZE, y * UNIT_SIZE]);
        currentPosition = getRight();
        currentDirection = "down";
        break;
      case "up":
        vertices.push([(x + 1) * UNIT_SIZE, (y + 1) * UNIT_SIZE]);
        currentPosition = getRight();
        currentDirection = "right";
        break;
      case "left":
        vertices.push([x * UNIT_SIZE, (y + 1) * UNIT_SIZE]);
        currentPosition = getRight();
        currentDirection = "up";
        break;
      case "down":
        vertices.push([x * UNIT_SIZE, y * UNIT_SIZE]);
        currentPosition = getRight();
        currentDirection = "left";
        break;
    }
  };

  const goStraight = () => {
    switch (currentDirection) {
      case "right":
        currentPosition = getStraight();
        break;
      case "up":
        currentPosition = getStraight();
        break;
      case "left":
        currentPosition = getStraight();
        break;
      case "down":
        currentPosition = getStraight();
        break;
    }
  };

  const turnLeft = () => {
    const [x, y] = currentPosition;
    switch (currentDirection) {
      case "right":
        vertices.push([(x + 1) * UNIT_SIZE, y * UNIT_SIZE]);
        currentDirection = "up";
        break;
      case "up":
        vertices.push([(x + 1) * UNIT_SIZE, (y + 1) * UNIT_SIZE]);
        currentDirection = "left";
        break;
      case "left":
        vertices.push([x * UNIT_SIZE, (y + 1) * UNIT_SIZE]);
        currentDirection = "down";
        break;
      case "down":
        vertices.push([x * UNIT_SIZE, y * UNIT_SIZE]);
        currentDirection = "right";
        break;
    }
  };

  const getStart = () => {
    let start = null;

    coordinates.forEach(coor => {
      if (!start) {
        start = coor;
        return;
      }

      if (coor[1] < start[1]) {
        start = coor;
        return;
      }

      if (coor[1] === start[1] && coor[0] < start[0]) {
        start = coor;
      }
    });

    return start;
  };

  const start = getStart();

  vertices.push([start[0] * UNIT_SIZE, start[1] * UNIT_SIZE]);

  do {
    if (hasCoordinates(...getRight())) {
      turnRight();
    } else if (hasCoordinates(...getStraight())) {
      goStraight();
    } else {
      turnLeft();
    }
  } while (
    currentPosition[0] !== start[0] ||
    currentPosition[1] !== start[1] ||
    currentDirection !== "down"
  );

  return center(vertices);
};
