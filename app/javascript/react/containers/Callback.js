import React from 'react';
import { browserHistory } from 'react-router';
import storage from '../util/storage';
import userClient from '../clients/user';

class Callback extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    userClient.post(this.props.location.query.code)
    .then(response => response.json())
    .then(body => storage.set("jwt", body))
    .then(() => browserHistory.push('/track-player'))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div></div>
    )
  }
}

export default Callback
