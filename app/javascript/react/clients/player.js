import getDefaultOptions from '../util/getDefaultOptions';
import getToken from '../util/getToken';

const PLAYER_PATH = 'https://api.spotify.com/v1/me/player/play';

const put = (trackUris, deviceId) => fetch(`${PLAYER_PATH}?device_id=${deviceId}`, {
  ...getDefaultOptions(),
  body: JSON.stringify({ uris: trackUris }),
  method: 'PUT'
});

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
    getOAuthToken: callback => callback(getToken())
  }));

export default {
  get: get,
  put: put
}
