const USER_TRACK_CATEGORY_PATH = '/api/v1/user';

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XHMLttpRequest'
  }
};

const post = (userId, payload) => fetch(
  `${USER_TRACK_CATEGORY_PATH}/${userId}/user_track_categories.json`,
  {
    ...defaultOptions,
    body: JSON.stringify(payload),
    method: 'POST'
  }
);

const get = userId => fetch(
  `${USER_TRACK_CATEGORY_PATH}/${userId}/user_track_categories.json`,
  defaultOptions
);

export default {
  post: post,
  get: get
};
