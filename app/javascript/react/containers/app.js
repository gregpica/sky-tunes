import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Callback from './Callback';
import TrackPlayer from './TrackPlayer';
import NewTrackContainer from './NewTrackContainer';
import ProtectedRoute from '../components/ProtectedRoute';

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/callback' component={Callback} />
        <ProtectedRoute path='/track-player' component={TrackPlayer} />
        <ProtectedRoute path='/tracks/new' component={NewTrackContainer} />
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
