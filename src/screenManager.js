import Screen from "./screen";
import { INITIAL_SCREEN_DISTANCE, CAMERA_DISTANCE } from "./constants";

class ScreenManager {
  constructor() {
    const screens = [
      new Screen(),
      new Screen(),
    ];
    let currentIndex = 0;
    let currentScreen = screens[currentIndex];
    let previousScreen = null;

    screens.forEach(screen => {
      screen.moveTo(-10 * INITIAL_SCREEN_DISTANCE);
    });

    currentScreen.moveTo(-INITIAL_SCREEN_DISTANCE);

    this.getCurrentScreen = () => currentScreen;

    this.getScreens = () => screens;

    this.zoom = () => {
      const distanceToZoom = -currentScreen.mesh.position.z;

      return new Promise(resolve => {
        currentScreen.zoom(distanceToZoom).then(() => {
          previousScreen = currentScreen;
          currentIndex = (currentIndex + 1) % screens.length;
          currentScreen = screens[currentIndex];
          currentScreen.moveTo(-INITIAL_SCREEN_DISTANCE);
          resolve();
        });
      });
    };

    this.setNewHole = projection => {
      currentScreen.setNewHole(projection);
    };

    this.update = () => {
      currentScreen.update();
      if (previousScreen) {
        previousScreen.update();

        if (previousScreen.mesh.position.z > CAMERA_DISTANCE) {
          previousScreen = null;
        }
      }
    };
  }
}

export default ScreenManager;
