import React from 'react';
import TrackIndexTile from '../components/TrackIndexTile';
import convert from '../util/convert';
import createArtistList from '../util/createArtistList';
import trackClient from '../clients/track';
import storage from '../util/storage';
import { USER } from '../constants';

class TracksIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: [],
      droppedDownTracks: [],
      changeMessage: null
    }

    this.getTrackIndexTiles = this.getTrackIndexTiles.bind(this);
    this.dropDownTrack = this.dropDownTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
  }

  componentDidMount() {
    const userId = storage.get(USER).id;
    trackClient.get(userId)
      .then(response => response.json())
      .then(body => {
        const tracks = body.user_track_categories.map(utc => utc.track);
        this.setState({
          tracks: tracks
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  dropDownTrack(id) {
     const { droppedDownTracks } = this.state

     if(droppedDownTracks.includes(id)) {
       this.setState({
         droppedDownTracks: droppedDownTracks.filter(trackId => trackId !== id)
       })
     } else {
       droppedDownTracks.push(id)
       this.setState({
         droppedDownTracks: droppedDownTracks
       })
     }
  }

  deleteTrack(id) {
    if (window.confirm('Are you sure you want to delete this track?')) {
      const userId = storage.get(USER).id;
      trackClient.deleteTrack(userId, id)
        .then(response  => response.json())
        .then(body => {
          if(body.success) {
           this.setState({
             changeMessage: body.success,
             tracks: this.state.tracks.filter(track => track.id !== id)
           })
         } else {
           this.setState({
             changeMessage: body.error
           })
         }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  getTrackIndexTiles() {
    return this.state.tracks.map(track => {
      let hidden, dropDownIcon;
      if (this.state.droppedDownTracks.includes(track.id)) {
        hidden = "";
        dropDownIcon = "fas fa-minus";
      } else {
        hidden = "hidden";
        dropDownIcon = "fas fa-plus";
      }
      return <TrackIndexTile
         key={track.id}
         title={track.title}
         artists={track.artist}
         album={track.album}
         albumCover={track.album_cover}
         duration={track.duration}
         hidden={hidden}
         dropDownIcon={dropDownIcon}
         dropDownTrack={() => this.dropDownTrack(track.id)}
         handleDelete={() => this.deleteTrack(track.id)}
      />
    })
  }

  render() {

    return(
      <div>
        <div className="save-message">
          {this.state.changeMessage}
        </div>
        <div className="index-labels">
          <span className="title">TITLE</span>
          <span className="title">ARTIST</span>
          <span className="title">ALBUM</span>
          <span className="title"><i className="far fa-clock"></i></span>
        </div>
        {this.getTrackIndexTiles()}
      </div>
    )
  }
}

export default TracksIndexContainer
