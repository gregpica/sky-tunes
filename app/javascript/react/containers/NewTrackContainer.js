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
    this.renderSearchResultsOrForm = this.renderSearchResultsOrForm.bind(this);

  }

  onSelectTrack(track) {
    this.setState({
      selectedTrack: track
    })
  }

  renderSearchResultsOrForm() {
    const { selectedTrack } = this.state;
    if (!selectedTrack) {
      return <Search
                    handleSelect={(track) => this.onSelectTrack(track)}
             />
    } else {
      return <TrackForm
                    title={selectedTrack.name}
                    artists={createArtistList(selectedTrack.artists)}
                    album={selectedTrack.album.name}
                    albumCover={selectedTrack.album.images[1].url}
                    duration={convert.msToMinsAndSecs(selectedTrack.duration_ms)}
             />
    }
  }

  render() {

    return(
      <div>
        {this.renderSearchResultsOrForm()}
      </div>
    )
  }
}

export default NewTrackContainer
