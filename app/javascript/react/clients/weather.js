const WEATHER_PATH = '/api/v1/weather.json';

const defaultOptions = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XHMLttpRequest'
  }
};

const get = () => fetch(WEATHER_PATH, {
  defaultOptions
});

export default {
  get: get
};
