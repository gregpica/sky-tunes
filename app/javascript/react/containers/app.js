import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Login from './Login'
import Callback from './Callback'
 

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' >
        <IndexRoute component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/callback' component={Callback} />
      </Route>
    </Router>
  )
}

export default App
