import flatPicker from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');

const refs = {
  dataSecondsEl: document.querySelector('[data-seconds]'),
  dataMinutesEl: document.querySelector('[data-minutes]'),
  dataHoursEl: document.querySelector('[data-hours]'),
  dataDaysEl: document.querySelector('[data-days]'),
};

const timer = {
  intervalId: null,
  isActive: false,

  isDisable() {
    if (!this.isActive) {
      return;
    }
    clearInterval(this.intervalId);
    this.isActive = false;
  },

  start() {
    if (this.isActive) {
      this.isDisable();
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const selectedTime = new Date(inputEl.value).getTime();
      const currentTime = Date.now();

      const result = selectedTime - currentTime;
      if (currentTime > selectedTime) {
        Notify.failure('Please choose a date in the future');
        this.isDisable();
        return;
      }
      updateTimerFace(convertMs(result));
      this.isActive = false;
    }, 1000);
  },
};

startBtn.addEventListener('click', () => {
  timer.start();
});

flatPicker(inputEl, timer);

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.dataSecondsEl.textContent = `${seconds}`;
  refs.dataMinutesEl.textContent = `${minutes}`;
  refs.dataHoursEl.textContent = `${hours}`;
  refs.dataDaysEl.textContent = `${days}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
