import getTokenValue from '../util/getTokenValue';

const USER_PATH = '/api/v1/user.json';

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XHMLttpRequest'
  }
};

const post = code => fetch(USER_PATH, {
  ...defaultOptions,
  body: JSON.stringify({ code: code }),
  method: 'POST'
});

const refresh = () => fetch(USER_PATH, {
  ...defaultOptions,
  body: JSON.stringify({ refresh_token: getTokenValue('refresh_token') }),
  method: 'POST'
});

export default {
  post: post,
  refresh: refresh
};
