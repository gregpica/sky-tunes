import React from 'react';
import trackClient from '../clients/track';
import playerClient from '../clients/player';
import { Link } from 'react-router-dom';


class TrackPlayer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      player: null
    };
    this.setupPlayer = this.setupPlayer.bind(this);
    this.getUserTracksAndStartPlayback = this.getUserTracksAndStartPlayback.bind(this);
  }

  setupPlayer() {
    playerClient.get()
      .then(player => {
        player.addListener("player_state_changed", state => {
          this.setState({player: state})
        });
        player.addListener('ready', ({ device_id }) => {
          this.getUserTracksAndStartPlayback(device_id)
        });
        player.connect();
      })
  }

  getUserTracksAndStartPlayback(deviceId) {
    trackClient.get()
      .then(response => response.json())
      .then(tracks => tracks.map(track => track.track_id))
      .then(trackIds => {
        const trackUris = trackIds.map(trackId => `spotify:track:${trackId}`);
        return playerClient.put(trackUris, deviceId);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.setupPlayer();
  }

  render() {
    const currentTrack = this.state.player && this.state.player.track_window.current_track;
    return(
      <div>
        <div>Track Player Page</div>
        <div>Currently Playing: {currentTrack && currentTrack.name}</div>
        <Link to="/tracks/new"><button>Add New Track</button></Link>
      </div>
    )
  }
}

export default TrackPlayer
