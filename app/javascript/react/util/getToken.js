import storage from './storage';
import { JWT } from '../constants';

export default () => {
  const jwt = storage.get(JWT);
  return (jwt && jwt.access_token) || "";
}
