import { rotate } from "../src/rotations";

it("rotates left", () => {
  expect(rotate("left", { x: 0, y: 0, z: 0 })).toEqual({
    x: 0,
    y: -0.5 * Math.PI,
    z: 0
  });
});

it("rotates right", () => {
  expect(rotate("right", { x: 0, y: 0, z: 0 })).toEqual({
    x: 0,
    y: 0.5 * Math.PI,
    z: 0
  });
});

it("rotates up", () => {
  expect(rotate("up", { x: 0, y: 0, z: 0 })).toEqual({
    x: -0.5 * Math.PI,
    y: 0,
    z: 0
  });
});

it("rotates down", () => {
  expect(rotate("down", { x: 0, y: 0, z: 0 })).toEqual({
    x: 0.5 * Math.PI,
    y: 0,
    z: 0
  });
});
