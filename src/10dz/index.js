import './css/styles.css';
import countryInfoTpl from '../src/templates/country-info.hbs';
import countryListTpl from '../src/templates/country-list.hbs';
import throttle from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiServices from './js/NewApiServices';

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-info');
const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

const newApiServices = new NewApiServices();

searchInput.addEventListener('input', throttle(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  newApiServices.query = searchInput.value.trim();

  newApiServices
    .fetchCountries()
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        renderCountryInfoMarkup(countries);
      } else {
        renderCountryListMarkup(countries);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
  clearCountriesContainer();
}

function renderCountryInfoMarkup(countries) {
  countries.flatMap(item => {
    console.log(item.languages);
    const { name, capital, population, flags, language } = item;
    countryInfoTpl(item);
    makeCountryInfoMarkup(item);
  });
}

function renderCountryListMarkup(countries) {
  countries.map(item => {
    const { nativeName, flags } = item;
    countryListTpl(item);
    makeCountryListMarkup(item);
    return;
  });

  return;
}

function makeCountryInfoMarkup(countries) {
  return countryInfo.insertAdjacentHTML('beforeend', countryInfoTpl(countries));
}

function makeCountryListMarkup(countries) {
  return countryList.insertAdjacentHTML('beforeend', countryListTpl(countries));
}

function clearCountriesContainer() {
  countryInfo.innerHTML = '';
}
