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
      tracks: []
    }

    this.getTrackIndexTiles = this.getTrackIndexTiles.bind(this);
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

  getTrackIndexTiles() {
    return this.state.tracks.map(track =>
      <TrackIndexTile
         key={track.id}
         id={track.id}
         title={track.name}
         artists={createArtistList(track.artists)}
         album={track.album.name}
         albumCover={track.album.images[1].url}
         duration={convert.msToMinsAndSecs(track.duration_ms)}
      />
    )
  }

  render() {

    return(
      <div>
        <br></br>
        {this.getTrackIndexTiles()}
      </div>
    )
  }
}

export default TracksIndexContainer
