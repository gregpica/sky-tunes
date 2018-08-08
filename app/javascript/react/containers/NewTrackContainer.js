import React from 'react';
import Search from './Search';
import TrackForm from './TrackForm';
import convert from '../util/convert';
import createArtistList from '../util/createArtistList'

class NewTrackContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTrack: null
    }
    this.onSelectTrack = this.onSelectTrack.bind(this);

  }

  onSelectTrack(track) {
    this.setState({
      selectedTrack: track
    })
  }

  render() {
    const { selectedTrack } = this.state

    let renderDiv;
    if (!selectedTrack) {
      renderDiv = <Search
                    handleSelect={(track) => this.onSelectTrack(track)}
                  />
    } else {
      renderDiv = <TrackForm
                    title={selectedTrack.name}
                    artists={createArtistList(selectedTrack.artists)}
                    album={selectedTrack.album.name}
                    albumCover={selectedTrack.album.images[1].url}
                    duration={convert.msToMinsAndSecs(selectedTrack.duration_ms)}
                  />
    }

    return(
      <div>
        {renderDiv}
      </div>
    )
  }
}

export default NewTrackContainer
