import { rotate } from "../src/rotations";
import { Euler } from "three";

it("rotates left", () => {
  const direction = new Euler(0, 0, 0);

  rotate("left", direction);

  expect(direction.x).toBeCloseTo(0);
  expect(direction.y).toBeCloseTo(-0.5 * Math.PI);
  expect(direction.z).toBeCloseTo(0);
});

it("rotates left after rotating up", () => {
  const direction = new Euler(-0.5 * Math.PI, 0, 0);

  rotate("left", direction);

  expect(direction.x).toBeCloseTo(-0.5 * Math.PI);
  expect(direction.y).toBeCloseTo(0);
  expect(direction.z).toBeCloseTo(-0.5 * Math.PI);
});

it("rotates right", () => {
  const direction = new Euler(0, 0, 0);

  rotate("right", direction);

  expect(direction.x).toBeCloseTo(0);
  expect(direction.y).toBeCloseTo(0.5 * Math.PI);
  expect(direction.z).toBeCloseTo(0);
});

it("rotates up", () => {
  const direction = new Euler(0, 0, 0);

  rotate("up", direction);

  expect(direction.x).toBeCloseTo(-0.5 * Math.PI);
  expect(direction.y).toBeCloseTo(0);
  expect(direction.z).toBeCloseTo(0);
});

it("rotates down", () => {
  const direction = new Euler(0, 0, 0);

  rotate("down", direction);

  expect(direction.x).toBeCloseTo(0.5 * Math.PI);
  expect(direction.y).toBeCloseTo(0);
  expect(direction.z).toBeCloseTo(0);
});
