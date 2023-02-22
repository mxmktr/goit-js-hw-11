/* import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'; */
import axios from 'axios';
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
  const currentForm = event.currentTarget;

  searchQueryValue = currentForm.elements.searchQuery.value.trim();

  if (!searchQueryValue) {
    console.log('Idiot, you fill nothing!');
    return;
  }

  apiService
    .getImages(searchQueryValue)
    .then(data => console.log(data))
    .catch(error => console.log(error.message));
});

loadBtn.addEventListener('click', event => {
  apiService.nextPage();
  if (apiService.numberOfPages > apiService.params.page) {
    apiService.getImages(searchQueryValue).then(data => console.log(data));
  } else {
    apiService.getImages(searchQueryValue).then(data => console.log(data));
    loadBtn.disabled = true;
    loadBtn.textContent = 'Finish';
  }
});
