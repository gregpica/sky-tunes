import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import storage from '../util/storage';
import userClient from '../clients/user';
import { JWT } from '../constants';
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
    if(parsedQuerySearch.error) {
      this.setState({ error: "You must connect to Spotify in order to user SkyTunes!" });
    } else {
      userClient.post(parsedQuerySearch.code)
        .then(response => response.json())
        .then(body => storage.set(JWT, body))
        .then(() => this.props.history.push('/track-player'))
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render() {
    let callBackElement = <div></div>
    if (this.state.error) {
      callBackElement = <Login
                          error={this.state.error}
                        />
    }

    return(
      <div>
        {callBackElement}
      </div>
    )
  }
}

export default Callback
