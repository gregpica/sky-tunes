import React from 'react';
import trackClient from '../clients/track';
import playerClient from '../clients/player';


class TrackPlayer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tracks: []
    };

    this.getUserTracks = this.getUserTracks.bind(this);
    this.startPlayback = this.startPlayback.bind(this);
  }

  getUserTracks() {
    trackClient.get()
      .then(response => response.json())
      .then(body => {
        this.setState({
          tracks: body
        })
        this.startPlayback();
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  startPlayback() {
    const trackUris = this.state.tracks.map(track => {
      return `spotify:track:${track.track_id}`
    });
    playerClient.put(trackUris)
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getUserTracks();
  }

  render() {
    return(
      <div>
        <div>Track Player Page</div>
        <a href="/tracks/new"><button>Add New Track</button></a>
      </div>
    )
  }
}

export default TrackPlayer
