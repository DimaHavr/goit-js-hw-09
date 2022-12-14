import flatPicker from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const currentTime = Date.now();

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

 
};

const refs = {
  dataSecondsEl: document.querySelector('[data-seconds]'),
  dataMinutesEl: document.querySelector('[data-minutes]'),
  dataHoursEl: document.querySelector('[data-hours]'),
  dataDaysEl: document.querySelector('[data-days]'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.DELAY = 1000;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      clearInterval(this.intervalId);
      this.isActive = false;
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const selectedTime = new Date(inputEl.value).getTime();
 const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const time = this.convertMs(deltaTime);

      if (!selectedTime) {
        this.isActive = false;
        clearInterval(this.intervalId);
        return;
      } else if (currentTime > selectedTime) {
        this.isActive = false;
        clearInterval(this.intervalId);
        return;
      }
      this.onTick(time);
      this.isActive = false;
    }, this.DELAY);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateTimerFace,
});

flatPicker(inputEl, options);

startBtn.addEventListener('click', timer.start.bind(timer));

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.dataSecondsEl.textContent = `${seconds}`;
  refs.dataMinutesEl.textContent = `${minutes}`;
  refs.dataHoursEl.textContent = `${hours}`;
  refs.dataDaysEl.textContent = `${days}`;
}
