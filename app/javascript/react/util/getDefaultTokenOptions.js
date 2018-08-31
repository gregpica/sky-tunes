import getTokenValue from './getTokenValue';

export default () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getTokenValue('access_token')}`
  }
});
