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
      droppedDownTracks: []
    }

    this.getTrackIndexTiles = this.getTrackIndexTiles.bind(this);
    this.dropDownTrack = this.dropDownTrack.bind(this);
  }

  componentDidMount() {
    const userId = storage.get(USER).id;
    trackClient.get(userId)
      .then(response => response.json())
      .then(trackIds => trackClient.getInfo(trackIds))
      .then(response => response.json())
      .then(body => {
        this.setState({
          tracks: body.tracks
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

  getTrackIndexTiles() {
    return this.state.tracks.map(track => {
      let hidden, dropDownIcon;
      if (this.state.droppedDownTracks.includes(track.id)) {
        hidden = "";
        dropDownIcon = "fas fa-minus"
      } else {
        hidden = "hidden";
        dropDownIcon = "fas fa-plus"
      }
      return <TrackIndexTile
         key={track.id}
         id={track.id}
         title={track.name}
         artists={createArtistList(track.artists)}
         album={track.album.name}
         albumCover={track.album.images[1].url}
         duration={convert.msToMinsAndSecs(track.duration_ms)}
         dropDownIcon={dropDownIcon}
         hidden={hidden}
         dropDownTrack={(id) => this.dropDownTrack(id)}
       />
    })
  }

  render() {

    return(
      <div>
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
