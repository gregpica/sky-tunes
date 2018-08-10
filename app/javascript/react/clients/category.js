const CATEGORIES_PATH = '/api/v1/categories.json';

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XHMLttpRequest'
  }
};

const get = () => fetch(CATEGORIES_PATH, {
  defaultOptions
});

export default {
  get: get
};
