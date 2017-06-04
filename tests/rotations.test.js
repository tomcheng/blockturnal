import { rotate } from "../src/rotations";
import { Euler } from "three";

it("rotates left", () => {
  const direction = new Euler(0,0,0);

  rotate("left", direction);

  expect(direction.x).toBe(0);
  expect(direction.y).toBe(-0.5 * Math.PI);
  expect(direction.z).toBe(0);
});

it("rotates right", () => {
  const direction = new Euler(0,0,0);

  rotate("right", direction);

  expect(direction.x).toBe(0);
  expect(direction.y).toBe(0.5 * Math.PI);
  expect(direction.z).toBe(0);
});

it("rotates up", () => {
  const direction = new Euler(0,0,0);

  rotate("up", direction);

  expect(direction.x).toBe(-0.5 * Math.PI);
  expect(direction.y).toBe(0);
  expect(direction.z).toBe(0);
});

it("rotates down", () => {
  const direction = new Euler(0,0,0);

  rotate("down", direction);

  expect(direction.x).toBe(0.5 * Math.PI);
  expect(direction.y).toBe(0);
  expect(direction.z).toBe(0);
});
