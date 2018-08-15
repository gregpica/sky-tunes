import getToken from './getToken';

export default () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
});
