const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

class ColorSwitcher {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
    this.DELAY = 1000;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      bodyEl.style.backgroundColor = this.getRandomHexColor();
    }, this.DELAY);
  }

  stop() {
    if (!this.isActive) {
      return;
    }
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

const colorSwitcher = new ColorSwitcher();

startBtn.addEventListener('click', colorSwitcher.start.bind(colorSwitcher));

stopBtn.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));
