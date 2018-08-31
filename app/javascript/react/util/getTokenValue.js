import storage from './storage';
import { JWT } from '../constants';

export default (key) => {
  const jwt = storage.get(JWT);
  return (jwt && jwt[key]) || "";
}
