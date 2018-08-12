import storage from '../util/storage';

const USER_TRACK_CATEGORY_PATH = `/api/v1/user/${storage.get('user').id}/user_track_category.json`;

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XHMLttpRequest'
  }
};

const post = (payload) => fetch(USER_TRACK_CATEGORY_PATH, {
  ...defaultOptions,
  body: JSON.stringify(payload),
  method: 'POST'
});

const get = () => fetch(USER_TRACK_CATEGORY_PATH, {
  ...defaultOptions
});

export default {
  post: post,
  get: get
};
