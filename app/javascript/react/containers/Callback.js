import React from 'react';
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
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div></div>
    )
  }
}

export default Callback
