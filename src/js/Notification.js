import Notiflix from 'notiflix';

const notiflixOptions = { timeout: 2000 };

export default class Notification {
  static success(message) {
    Notiflix.Notify.success(message, notiflixOptions);
  }

  static failure() {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      notiflixOptions
    );
  }

  static info() {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results.",
      notiflixOptions
    );
  }
}
