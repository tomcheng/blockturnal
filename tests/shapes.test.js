import { getOutline } from "../src/shapes";
import { UNIT_SIZE } from "../src/constants";

it("Gets an outline for a unit square", () => {
  expect(getOutline([[0, 0]])).toEqual([
    [-0.5 * UNIT_SIZE, -0.5 * UNIT_SIZE],
    [0.5 * UNIT_SIZE, -0.5 * UNIT_SIZE],
    [0.5 * UNIT_SIZE, 0.5 * UNIT_SIZE],
    [-0.5 * UNIT_SIZE, 0.5 * UNIT_SIZE]
  ]);
});

it("Gets an outline for a double unit", () => {
  expect(getOutline([[0, 0], [1, 0]])).toEqual([
    // * *
    [-UNIT_SIZE, -0.5 * UNIT_SIZE],
    [UNIT_SIZE, -0.5 * UNIT_SIZE],
    [UNIT_SIZE, 0.5 * UNIT_SIZE],
    [-UNIT_SIZE, 0.5 * UNIT_SIZE]
  ]);
});

it("Gets an outline for a small L", () => {
  // *
  // * *
  expect(getOutline([[0, 0], [1, 0], [0, 1]])).toEqual([
    [-UNIT_SIZE, -UNIT_SIZE],
    [UNIT_SIZE, -UNIT_SIZE],
    [UNIT_SIZE, 0],
    [0, 0],
    [0, UNIT_SIZE],
    [-UNIT_SIZE, UNIT_SIZE]
  ]);
});

it("Gets an outline for a shape that doesn't start on origin", () => {
  // * *
  //   *
  expect(getOutline([[1, 0], [0, 1], [1, 1]])).toEqual([
    [0, -UNIT_SIZE],
    [UNIT_SIZE, -UNIT_SIZE],
    [UNIT_SIZE, UNIT_SIZE],
    [-UNIT_SIZE, UNIT_SIZE],
    [-UNIT_SIZE, 0],
    [0, 0]
  ]);
});

it("Gets an outline for another shape", () => {
  // * * *
  // *
  expect(getOutline([[-1, 0], [0, 0], [1, 0], [-1, -1]])).toEqual([
    [-1.5 * UNIT_SIZE, -UNIT_SIZE],
    [-0.5 * UNIT_SIZE, -UNIT_SIZE],
    [-0.5 * UNIT_SIZE, 0],
    [1.5 * UNIT_SIZE, 0],
    [1.5 * UNIT_SIZE, UNIT_SIZE],
    [-1.5 * UNIT_SIZE, UNIT_SIZE]
  ]);
});

