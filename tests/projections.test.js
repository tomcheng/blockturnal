import { Vector3 } from "three";
import { getProjection } from "../src/projections";

const coordinates = [
  new Vector3(0, 0, 0),
  new Vector3(-1, 0, 0),
  new Vector3(-1, 1, 0),
  new Vector3(1, 0, 0)
];

it("Gets projection for z-axis", () => {
  expect(getProjection({ axis: "z", coordinates })).toEqual([
    [0, 0],
    [-1, 0],
    [-1, 1],
    [1, 0]
  ]);
});

it("Gets projection for x-axis", () => {
  expect(getProjection({ axis: "x", coordinates })).toEqual([[0, 0], [1, 0]]);
});
