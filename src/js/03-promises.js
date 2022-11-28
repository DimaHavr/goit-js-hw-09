import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
let promiseCounter = 0;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  createPromises();
}

function createPromises() {
  const amountInputEL = form.elements.amount.value;

  let intervalId = setInterval(() => {
    if (promiseCounter !== +amountInputEL) {
      createPromise()
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      promiseCounter += 1;
      return;
    } else {
      clearInterval(intervalId);
      promiseCounter = 0;
      return;
    }
  }, 0);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const timeoutInputEl = form.elements.delay.value;
    const stepInputEl = form.elements.step.value;

    position = promiseCounter + 1;
    delay = timeoutInputEl - stepInputEl + stepInputEl * position;

    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
