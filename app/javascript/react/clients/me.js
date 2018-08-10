import storage from '../util/storage';
import { JWT } from '../constants'

const ME_PATH = 'https://api.spotify.com/v1/me';
const accessToken = storage.get(JWT) ? storage.get(JWT).access_token : ""

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
};

const get = () => fetch(ME_PATH,
  defaultOptions
);

export default {
  get: get
};
