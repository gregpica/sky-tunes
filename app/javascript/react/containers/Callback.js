import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import storage from '../util/storage';
import userClient from '../clients/user';
import { JWT } from '../constants';

class Callback extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const queryString = require('query-string')
    const code = queryString.parse(this.props.location.search).code
    userClient.post(code)
      .then(response => response.json())
      .then(body => storage.set(JWT, body))
      .then(() => this.props.history.push('/track-player'))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div></div>
    )
  }
}

export default Callback
