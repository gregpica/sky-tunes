import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import storage from '../util/storage';
import { JWT } from '../constants'

export default ({path, component}) => {
  const tokenValue = storage.get(JWT)
  if(!tokenValue) {
    return <Redirect to="/login"/>
  } else {
    return <Route path={path} component={component}/>
  }
}
