import getDefaultOptions from '../util/getDefaultOptions';

const SEARCH_PATH = 'https://api.spotify.com/v1/search';

const get = query => fetch(
  `${SEARCH_PATH}?q=${encodeURIComponent(query)}&type=track`,
  getDefaultOptions()
);

export default {
  get: get
};
