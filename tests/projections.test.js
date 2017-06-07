import { Vector3, Vector2 } from "three";
import { getProjection } from "../src/projections";

const coordinates = [
  new Vector3(0, 0, 0),
  new Vector3(-1, 0, 0),
  new Vector3(-1, 1, 0),
  new Vector3(1, 0, 0)
];

it("Gets projection for z-axis", () => {
  expect(getProjection({ axis: "z", coordinates })).toEqual([
    new Vector2(0, 0),
    new Vector2(-1, 0),
    new Vector2(-1, 1),
    new Vector2(1, 0)
  ]);
});

it("Gets projection for x-axis", () => {
  expect(getProjection({ axis: "x", coordinates })).toEqual([
    new Vector2(0, 0),
    new Vector2(1, 0)
  ]);
});
