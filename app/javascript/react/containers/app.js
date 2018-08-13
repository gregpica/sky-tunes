import React from 'react';
import { Route, BrowserRouter, Redirect, Switch, Link } from 'react-router-dom';
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
        <ProtectedRoute path='/tracks' component={() => (
          <TrackPlayer>
            <Switch>
              <Route path='/tracks/new' component={NewTrackContainer} />
              <Link to="/tracks/new"><button>Add New Track</button></Link>}/>
            </Switch>
          </TrackPlayer>
        )}/>
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
