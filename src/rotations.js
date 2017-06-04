export const rotate = (direction, rotation) => {
  switch (direction) {
    case "left":
      return {
        ...rotation,
        y: rotation.y - 0.5 * Math.PI
      };
    case "right":
      return {
        ...rotation,
        y: rotation.y + 0.5 * Math.PI
      };
    case "up":
      return {
        ...rotation,
        x: rotation.x - 0.5 * Math.PI
      };
    case "down":
      return {
        ...rotation,
        x: rotation.x + 0.5 * Math.PI
      };
    default:
      return rotation;
  }
};
