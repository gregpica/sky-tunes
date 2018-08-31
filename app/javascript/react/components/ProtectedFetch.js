import storage from '../util/storage';
import { JWT, JWT_EXPIRATION_TIME_BUFFER } from '../constants';
import timeNowInSeconds from '../util/timeNowInSeconds';
import getTokenValue from '../util/getTokenValue';
import userClient from '../clients/user';
import getDefaultTokenOptions from '../util/getDefaultTokenOptions';
import fetch from "isomorphic-fetch"

export const createProtectedFetch = fetch => (path, args = null) => {
  if (timeNowInSeconds() < getTokenValue('expiration_time')) {
    return fetch(path, {
      ...getDefaultTokenOptions(),
      ...args
    })
  } else {
    return userClient.refresh()
      .then(response => response.json())
      .then(body => {
        body["expiration_time"] = timeNowInSeconds() + body["expires_in"] - JWT_EXPIRATION_TIME_BUFFER;
        storage.set(JWT, body)
      })
      .then(() => fetch(path, {
        ...getDefaultTokenOptions(),
        ...args
      }))
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }
}

export default createProtectedFetch(fetch)
