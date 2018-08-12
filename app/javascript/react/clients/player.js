import storage from '../util/storage';
import { JWT } from '../constants'

const PLAYER_PATH = 'https://api.spotify.com/v1/me/player/play';
const accessToken = storage.get(JWT) ? storage.get(JWT).access_token : ""

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
};

const put = (trackUris) => fetch(PLAYER_PATH, {
  ...defaultOptions,
  body: JSON.stringify({ uris: trackUris }),
  method: 'PUT'
});

export default {
  put: put
};
