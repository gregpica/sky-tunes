import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import timeNowInSeconds from '../util/timeNowInSeconds';
import getTokenValue from '../util/getTokenValue';

export default ({path, component}) => {
  const expirationTime = getTokenValue('expiration_time')
  if(expirationTime && timeNowInSeconds() < expirationTime) {
    return <Route path={path} component={component}/>
  } else {
    return <Redirect to="/login"/>
  }
}
