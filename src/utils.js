export const deviceHasTouch = () =>
  "ontouchstart" in window ||
  (window.DocumentTouch && document instanceof DocumentTouch);
