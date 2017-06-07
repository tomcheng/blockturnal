import Screen from "./screen";
import { INITIAL_SCREEN_DISTANCE, CAMERA_DISTANCE } from "./constants";

class ScreenManager {
  constructor() {
    const screens = [new Screen(), new Screen()];
    let currentIndex = 0;
    let currentScreen = screens[currentIndex];
    let previousScreen = null;
    let stopped = false;

    screens.forEach(screen => {
      screen.moveTo(-10 * INITIAL_SCREEN_DISTANCE);
    });

    currentScreen.moveTo(-INITIAL_SCREEN_DISTANCE);

    this.getScreens = () => screens;

    this.zoom = () => {
      return new Promise(resolve => {
        currentScreen.zoom().then(() => {
          previousScreen = currentScreen;
          currentIndex = (currentIndex + 1) % screens.length;
          currentScreen = screens[currentIndex];
          currentScreen.moveTo(-INITIAL_SCREEN_DISTANCE);
          resolve();
        });
      });
    };

    this.zoomAndStop = () => {
      return new Promise(resolve => {
        currentScreen.zoom().then(() => {
          stopped = true;
          resolve();
        });
      });
    };

    this.setNewHole = projection => {
      currentScreen.setNewHole(projection);
    };

    this.checkFit = projection => currentScreen.checkFit(projection);

    this.reset = () => {
      screens.forEach(screen => {
        screen.moveTo(-10 * INITIAL_SCREEN_DISTANCE);
      });
      currentScreen.moveTo(-INITIAL_SCREEN_DISTANCE);
      stopped = false;
    };

    this.update = () => {
      if (stopped) {
        return;
      }

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
