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

const put = (trackUris, deviceId) => fetch(`${PLAYER_PATH}?device_id=${deviceId}`, {
  ...defaultOptions,
  body: JSON.stringify({ uris: trackUris }),
  method: 'PUT'
});

//
// const get = () => fetch(PLAYBACK_INFO_PATH, {
//   defaultOptions
// });

// export default {
//   put: put,
//   get: get
// };

const playerReady = () => new Promise(resolve => {
  if (window.Spotify) {
    resolve(window.Spotify);
  } else {
    window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify);
  }
});

const get = () => playerReady()
  .then(({ Player }) => new Player({
    name: "SkyTunes SDK",
    volume: 1.0,
    getOAuthToken: callback => callback(accessToken)
  }));

export default {
  get: get,
  put: put
}
