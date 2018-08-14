import React from 'react';
import trackClient from '../clients/track';
import playerClient from '../clients/player';
import CurrentTrackPlaying from '../components/CurrentTrackPlaying';
import { Link } from 'react-router-dom';
import createArtistList from '../util/createArtistList';
import convert from '../util/convert';

class TrackPlayer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      playerState: null,
      player: null
    };
    this.setupPlayer = this.setupPlayer.bind(this);
    this.getUserTracksAndStartPlayback = this.getUserTracksAndStartPlayback.bind(this);
  }

  setupPlayer() {
    playerClient.get()
      .then(player => {
        player.addListener("player_state_changed", state => {
          this.setState({playerState: state})
        });
        player.addListener('ready', ({ device_id }) => {
          this.getUserTracksAndStartPlayback(device_id)
        });
        player.connect();
        this.setState({player: player})
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
    const currentTrack = this.state.playerState && this.state.playerState.track_window.current_track;

    let currentTrackDiv;

    if (currentTrack) {
      const playToggleClass = this.state.playerState.paused ? "far fa-play-circle" : "far fa-pause-circle";
      const { player } = this.state;

      currentTrackDiv = <CurrentTrackPlaying
        title={currentTrack.name}
        artists={createArtistList(currentTrack.artists)}
        albumCover={currentTrack.album.images[0].url}
        onPrevClick={() => player.previousTrack()}
        onPlayClick={() => player.togglePlay()}
        onNextClick={() => player.nextTrack()}
        playToggleClass={playToggleClass}
      />
    }

    return(
      <div className="text-center">
        <br></br>
        {currentTrackDiv}
        <br></br>
        <Link to="/tracks/new"><button className="add-new-track">Add New Track</button></Link>
      </div>
    )
  }
}

export default TrackPlayer
