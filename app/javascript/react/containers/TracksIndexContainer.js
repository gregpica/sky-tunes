import React from 'react';
import trackClient from '../clients/track';
import storage from '../util/storage';
import { USER } from '../constants';


class TracksIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
    const userId = storage.get(USER).id;
    trackClient.get()
      .then(response => response.json())
      .then(body => {
        this.setState({
          tracks: body.user_track_categories
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div>
        "Welcome to Tracks Index Container"
      </div>
    )
  }
}

export default TracksIndexContainer
