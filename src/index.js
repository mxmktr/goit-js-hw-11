/* import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'; */
import ApiService from './js/ApiService';
import './css/styles.css';

const form = document.getElementById('search-form');
const submitBtn = document.querySelector('.search-form button');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const apiService = new ApiService();

let searchQueryValue = '';

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!loadBtn.classList.contains('is-hidden'))
    loadBtn.classList.add('is-hidden');

  const currentForm = event.currentTarget;

  searchQueryValue = currentForm.elements.searchQuery.value.trim();

  if (!searchQueryValue) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  apiService
    .getImages(searchQueryValue)
    .then(data => {
      console.log(data);
      loadBtn.classList.remove('is-hidden');
    })
    .catch(error => console.log(error.message));
});

loadBtn.addEventListener('click', () => {
  apiService.nextPage();
  if (apiService.numberOfPages > apiService.params.page) {
    apiService.getImages(searchQueryValue).then(data => console.log(data));
  } else {
    apiService.getImages(searchQueryValue).then(data => console.log(data));
    loadBtn.classList.add('is-hidden');
    console.log("We're sorry, but you've reached the end of search results.");
  }
});
