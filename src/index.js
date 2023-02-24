import ApiService from './js/ApiService';
import Notification from './js/Notification';
import { markup, resetGallery } from './js/markup';
import './css/styles.css';

const form = document.getElementById('search-form');
const submitBtn = document.querySelector('.search-form button');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const apiService = new ApiService();

let searchQueryValue = '';

form.addEventListener('submit', event => {
  event.preventDefault();
  resetGallery();

  if (!loadBtn.classList.contains('is-hidden'))
    loadBtn.classList.add('is-hidden');

  const currentForm = event.currentTarget;

  searchQueryValue = currentForm.elements.searchQuery.value.trim();

  if (!searchQueryValue) {
    Notification.failure();
    return;
  }

  apiService.setFirstPage();
  apiService
    .getImages(searchQueryValue)
    .then(data => {
      gallery.innerHTML = markup(data);
      if (apiService.numberOfPages === 1) {
        Notification.success(
          `Hooray! We found ${apiService.params.totalHits} images.`
        );

        setTimeout(() => Notification.info(), 1000);
      } else {
        Notification.success(
          `Hooray! We found ${apiService.params.totalHits} images.`
        );
        loadBtn.classList.remove('is-hidden');
      }
    })
    .catch(() => Notification.failure());
});

loadBtn.addEventListener('click', () => {
  apiService.nextPage();

  if (apiService.numberOfPages > apiService.params.page) {
    apiService
      .getImages(searchQueryValue)
      .then(data => gallery.insertAdjacentHTML('beforeend', markup(data)));
  } else {
    apiService
      .getImages(searchQueryValue)
      .then(data => gallery.insertAdjacentHTML('beforeend', markup(data)))
      .finally(() => form.reset());
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      notiflixOptions
    );
  }
});
