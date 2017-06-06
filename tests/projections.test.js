import { getProjection } from "../src/projections";

const coordinates = [[0, 0, 0], [-1, 0, 0], [-1, 1, 0], [1, 0, 0]];

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
