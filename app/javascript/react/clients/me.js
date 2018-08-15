import getDefaultOptions from '../util/getDefaultOptions';

const ME_PATH = 'https://api.spotify.com/v1/me';

const get = () => fetch(ME_PATH,
  getDefaultOptions()
);

export default {
  get: get
};
