export default class NewApiServices {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      .then(data => data);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
