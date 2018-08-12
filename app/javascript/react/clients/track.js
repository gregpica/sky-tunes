import storage from '../util/storage';
import { USER } from '../constants';

const userId = storage.get(USER) ? storage.get(USER).id : ""
const USER_TRACK_CATEGORY_PATH = `/api/v1/user/${userId}/user_track_category.json`;

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
