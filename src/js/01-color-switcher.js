const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

stopBtn.disabled = true;

class ColorSwitcher {
  constructor() {
    this.intervalId = null;
    this.DELAY = 1000;
  }

  start() {
    this.intervalId = setInterval(() => {
      bodyEl.style.backgroundColor = this.getRandomHexColor();
    }, this.DELAY);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

  stop() {
    clearInterval(this.intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

const colorSwitcher = new ColorSwitcher();

startBtn.addEventListener('click', colorSwitcher.start.bind(colorSwitcher));

stopBtn.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));
