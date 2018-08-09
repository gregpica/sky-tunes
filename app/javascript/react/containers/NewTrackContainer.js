import React from 'react';
import Search from './Search';
import TrackForm from './TrackForm';
import convert from '../util/convert';
import createArtistList from '../util/createArtistList';
import storage from '../util/storage';
import { JWT } from '../constants';

class NewTrackContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTrack: null
    }
    this.onSelectTrack = this.onSelectTrack.bind(this);
    this.renderSearchResultsOrForm = this.renderSearchResultsOrForm.bind(this);
    this.addTrack = this.addTrack.bind(this);

  }

  onSelectTrack(track) {
    this.setState({
      selectedTrack: track
    })
  }

  addTrack(payload){
    fetch('/api/v1/user_track_category.json', {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(body => {
        this.setState({
          selectedTrack: null
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  renderSearchResultsOrForm() {
    const { selectedTrack } = this.state;
    if (!selectedTrack) {
      return <Search
               handleSelect={(track) => this.onSelectTrack(track)}
             />
    } else {
      const payload = {
                        track_id: selectedTrack.id,
                        user_id: storage.get('user').id,
                        category_id: 1
                      }
      return <TrackForm
               id={selectedTrack.id}
               title={selectedTrack.name}
               artists={createArtistList(selectedTrack.artists)}
               album={selectedTrack.album.name}
               albumCover={selectedTrack.album.images[1].url}
               duration={convert.msToMinsAndSecs(selectedTrack.duration_ms)}
               handleSubmit={() => this.addTrack(payload)}
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
