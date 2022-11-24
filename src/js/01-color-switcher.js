const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

const colorSwitcher = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stop() {
    if (!this.isActive) {
      return;
    }
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};

startBtn.addEventListener('click', () => {
  colorSwitcher.start();
});

stopBtn.addEventListener('click', () => {
  colorSwitcher.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
