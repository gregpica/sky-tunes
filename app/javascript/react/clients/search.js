import createProtectedFetch from '../components/ProtectedFetch';

const SEARCH_PATH = 'https://api.spotify.com/v1/search';

const get = query => createProtectedFetch(
  `${SEARCH_PATH}?q=${encodeURIComponent(query)}&type=track`
);

export default {
  get: get
};
