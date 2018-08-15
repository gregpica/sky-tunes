import React from 'react';
import trackClient from '../clients/track';


class TracksIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
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
