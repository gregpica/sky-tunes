import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import storage from '../util/storage';
import timeNowInSeconds from '../util/timeNowInSeconds';
import userClient from '../clients/user';
import meClient from '../clients/me';
import { JWT, JWT_EXPIRATION_TIME_BUFFER } from '../constants';

import Login from './Login'

class Callback extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null
    }
  }

  componentDidMount(){
    const queryString = require('query-string')
    const parsedQuerySearch = queryString.parse(this.props.location.search)
    if(parsedQuerySearch.code) {
      userClient.post(parsedQuerySearch.code)
        .then(response => response.json())
        .then(body => {
          body["expiration_time"] = timeNowInSeconds() + body["expires_in"] - JWT_EXPIRATION_TIME_BUFFER;
          storage.set(JWT, body)
        })
        .then(() => meClient.get())
        .then(response => response.json())
        .then(body => storage.set('user', body))
        .then(() => this.props.history.push('/track-player'))
        .catch(error => console.error(`Error in fetch: ${error.message}`))
    } else {
      this.setState({ error: "You must connect to Spotify in order to user SkyTunes!" });
    }
  }

  render() {
    let callBackElement = <div></div>
    if (this.state.error) {
      callBackElement = <div>
                          <p>{this.state.error}</p>
                          <a href="/login"><button>OK</button></a>
                        </div>
    }

    return(
      <div>
        {callBackElement}
      </div>
    )
  }
}

export default Callback
