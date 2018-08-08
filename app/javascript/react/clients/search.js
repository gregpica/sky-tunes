import storage from '../util/storage';
import { JWT } from '../constants'


const SEARCH_PATH = 'https://api.spotify.com/v1/search';
const accessToken = storage.get(JWT).access_token

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
};

const get = query => fetch(
  `${SEARCH_PATH}?q=${encodeURIComponent(query)}&type=track`,
  defaultOptions
);

export default {
  get: get
};
