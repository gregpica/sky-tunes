import createProtectedFetch from '../components/ProtectedFetch';

const ME_PATH = 'https://api.spotify.com/v1/me';

const get = () => createProtectedFetch(ME_PATH);

export default {
  get: get
};
