import { getDimensions } from "../src/measurements";
import { UNIT_SIZE } from "../src/constants";

it("Gets the dimensions for a unit cube", () => {
  expect(getDimensions([[0, 0, 0]])).toEqual({
    width: UNIT_SIZE,
    height: UNIT_SIZE,
    depth: UNIT_SIZE,
    x: -0.5 * UNIT_SIZE,
    y: -0.5 * UNIT_SIZE,
    z: -0.5 * UNIT_SIZE
  });
});
