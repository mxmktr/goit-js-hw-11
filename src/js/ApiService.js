import axios from 'axios';

export default class ApiService {
  URL = 'https://pixabay.com/api/?';

  params = {
    key: '7900432-26a61502dc2db9573bbff3077',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  };

  constructor() {}

  getImages(query) {
    this.params.q = query;
    return axios
      .get(`${this.URL}${new URLSearchParams(this.params)}`)
      .then(response => {
        return response.data;
      })
      .then(data => {
        const totalElements = data.totalHits;

        if (totalElements === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        this.numberOfPages = Math.ceil(totalElements / this.params.per_page);
        return data.hits;
      });
  }

  nextPage() {
    this.params.page += 1;
  }
}
