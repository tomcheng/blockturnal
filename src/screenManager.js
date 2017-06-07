import Screen from "./screen";

class ScreenManager {
  constructor() {
    const screens = [
      new Screen(),
      new Screen(),
      new Screen(),
    ];
    const currentIndex = 0;

    this.getCurrentScreen = () => screens[currentIndex];

    this.update = () => {
      screens[currentIndex].update();
    };
  }
}

export default ScreenManager;
