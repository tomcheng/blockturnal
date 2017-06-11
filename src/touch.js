import clone from "lodash/clone";

const touchEl = document.getElementById("touch");

const UNIT = 50;
let initial = null;
let rotations = null;
let rotated = false;

export const initializeTouch = ({ zoom, rotateFigure }) => {
  touchEl.style.display = "block";

  touchEl.addEventListener("touchstart", evt => {
    evt.preventDefault();

    initial = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
    rotations = { x: 0, y: 0 };
    rotated = false;
  });

  touchEl.addEventListener("touchmove", evt => {
    evt.preventDefault();

    const previousRotations = clone(rotations);

    rotations.x = Math.round((evt.touches[0].clientX - initial.x) / UNIT);
    rotations.y = Math.round((evt.touches[0].clientY - initial.y) / UNIT);

    if (rotations.x > previousRotations.x) {
      rotateFigure("right");
      rotated = true;
    } else if (rotations.x < previousRotations.x) {
      rotateFigure("left");
      rotated = true;
    }

    if (rotations.y > previousRotations.y) {
      rotateFigure("down");
      rotated = true;
    } else if (rotations.y < previousRotations.y) {
      rotateFigure("up");
      rotated = true;
    }
  });

  touchEl.addEventListener("touchend", evt => {
    evt.preventDefault();

    if (!rotated) {
      zoom();
    }
  });
};
