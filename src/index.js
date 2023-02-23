import Notiflix from 'notiflix';
import ApiService from './js/ApiService';
import './css/styles.css';

const form = document.getElementById('search-form');
const submitBtn = document.querySelector('.search-form button');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const apiService = new ApiService();
const notiflixOptions = { timeout: 2000 };

let searchQueryValue = '';

form.addEventListener('submit', event => {
  event.preventDefault();
  resetGallery();

  if (!loadBtn.classList.contains('is-hidden'))
    loadBtn.classList.add('is-hidden');

  const currentForm = event.currentTarget;

  searchQueryValue = currentForm.elements.searchQuery.value.trim();

  if (!searchQueryValue) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      notiflixOptions
    );
    return;
  }

  apiService.setFirstPage();
  apiService
    .getImages(searchQueryValue)
    .then(data => {
      gallery.innerHTML = markup(data);
      if (apiService.numberOfPages === 1) {
        Notiflix.Notify.success(
          `Hooray! We found ${apiService.params.totalHits} images.`,
          notiflixOptions
        );
        setTimeout(() => {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results.",
            notiflixOptions
          );
        }, 1000);
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${apiService.params.totalHits} images.`,
          notiflixOptions
        );
        loadBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => Notiflix.Notify.failure(error.message, notiflixOptions));
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

function markup(data) {
  return data.reduce(
    (
      markup,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => {
      return (
        `<div class="photo-card"><img src="${webformatURL}" alt="${tags}" loading="lazy"/><div class="info"><p class="info-item"><b>Likes</b>${likes}</p><p class="info-item"><b>Views</b>${views}</p><p class="info-item"><b>Comments</b>${comments}</p><p class="info-item"><b>Downloads</b>${downloads}</p></div></div>` +
        markup
      );
    },
    ''
  );
}

function resetGallery() {
  gallery.innerHTML = '';
}
