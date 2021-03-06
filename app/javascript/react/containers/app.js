import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Callback from './Callback';
import TrackPlayer from './TrackPlayer';
import TracksIndexContainer from './TracksIndexContainer';
import NewTrackContainer from './NewTrackContainer';
import ProtectedRoute from '../components/ProtectedRoute';
import NavBar from '../components/NavBar';

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <NavBar>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/callback' component={Callback} />
            <ProtectedRoute path='/track-player' component={TrackPlayer} />
            <ProtectedRoute path='/tracks/new' component={NewTrackContainer} />
            <ProtectedRoute path='/tracks' component={TracksIndexContainer} />
            <Redirect to='/track-player' />
          </Switch>
        </NavBar>
      </Switch>
    </BrowserRouter>
  )
}

export default App
