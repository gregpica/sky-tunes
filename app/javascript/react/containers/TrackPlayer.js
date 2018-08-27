import React from 'react';
import trackClient from '../clients/track';
import playerClient from '../clients/player';
import weatherClient from '../clients/weather';
import CurrentTrackPlaying from '../components/CurrentTrackPlaying';
import CurrentWeather from '../components/CurrentWeather';
import { Link } from 'react-router-dom';
import createArtistList from '../util/createArtistList';
import convert from '../util/convert';
import storage from '../util/storage';
import { USER, TRACK_PLAYER_PAGE } from '../constants';

class TrackPlayer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPlayerLoading: false,
      playerState: null,
      player: null,
      currentWeather: null
    };
    this.setupPlayer = this.setupPlayer.bind(this);
    this.getUserTracksAndStartPlayback = this.getUserTracksAndStartPlayback.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }

  setupPlayer() {
    this.setState({ isPlayerLoading: true });
    playerClient.get()
      .then(player => {
        player.addListener("player_state_changed", state => {
          this.setState({playerState: state})
        });
        player.addListener('ready', ({ device_id }) => {
          this.getUserTracksAndStartPlayback(device_id)
        });
        this.setState({player: player})
        return player.connect();
      })
      .finally(() => this.setState({ isPlayerLoading: false }))
  }

  getUserTracksAndStartPlayback(deviceId) {
    const userId = storage.get(USER).id;
    const weather = convert.toUnderscore(this.state.currentWeather.icon)
    trackClient.get(userId, weather)
      .then(response => response.json())
      .then(body => {
        const trackUris = body.user_track_categories.map(utc => `spotify:track:${utc.track.id}`);
        return playerClient.put(trackUris, deviceId);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getWeatherData() {
    weatherClient.get()
      .then(response => response.json())
      .then(body => {
        this.setState({
          currentWeather: body.currently
        })
        this.setupPlayer();
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getWeatherData();
  }

  componentWillUnmount() {
    this.state.player.disconnect();
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

    let currentWeatherDiv;
    const {currentWeather} = this.state;

    if (currentWeather) {
      currentWeatherDiv= <CurrentWeather
        temperature={Math.round(currentWeather.temperature)}
        summary={currentWeather.summary}
        icon={convert.toUpperUnderscore(currentWeather.icon)}
      />
    }

    return(
      <div className="text-center">
        <br></br>
        {currentWeatherDiv}
        {this.state.isPlayerLoading ? <p> Loading... </p> : currentTrackDiv }
        <br></br>
        <Link to="/tracks/new"><button className="add-new-track">Add New Tracks</button></Link>
      </div>
    )
  }
}

export default TrackPlayer
