/* import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'; */
import axios from 'axios';
import './css/styles.css';

const URL = 'https://pixabay.com/api/?';

const params = {
  key: '7900432-26a61502dc2db9573bbff3077',
  /* q: '', */
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

const searchParams = new URLSearchParams(params);
axios.get(`${URL}${searchParams}`).then(responseFromApi);

function responseFromApi(response) {
  console.log(response);
}

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
