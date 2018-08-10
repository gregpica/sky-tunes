const USER_TRACK_CATEGORY_PATH = '/api/v1/user_track_category.json';

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

export default {
  post: post
};
