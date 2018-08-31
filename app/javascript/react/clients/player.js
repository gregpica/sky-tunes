import getTokenValue from '../util/getTokenValue';
import createProtectedFetch from '../components/ProtectedFetch';

const PLAYER_PATH = 'https://api.spotify.com/v1/me/player/play';

const put = (trackUris, deviceId) => createProtectedFetch(`${PLAYER_PATH}?device_id=${deviceId}`, {
  body: JSON.stringify({ uris: trackUris }),
  method: 'PUT'
})

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
    getOAuthToken: callback => callback(getTokenValue('access_token'))
  }));

export default {
  get: get,
  put: put
}
