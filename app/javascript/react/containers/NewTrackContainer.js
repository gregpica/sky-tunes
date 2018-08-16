import React from 'react';
import Search from './Search';
import TrackForm from './TrackForm';
import convert from '../util/convert';
import createArtistList from '../util/createArtistList';
import storage from '../util/storage';
import { JWT, USER } from '../constants';
import trackClient from '../clients/track';

class NewTrackContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTrack: null,
      saveMessage: null,
      selectedCategories: []
    }
    this.onSelectTrack = this.onSelectTrack.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.renderSearchResultsOrForm = this.renderSearchResultsOrForm.bind(this);
    this.addTrack = this.addTrack.bind(this);

  }

  onSelectTrack(track) {
    this.setState({
      selectedTrack: track,
      saveMessage: null
    })
  }

  onSelectCategory(id) {
    const { selectedCategories } = this.state;

    if(selectedCategories.includes(id)) {
      this.setState({
        selectedCategories: selectedCategories.filter(categoryId => categoryId !== id)
      })
    } else {
      selectedCategories.push(id)
      this.setState({
        selectedCategories: selectedCategories
      })
    }
  }

  addTrack(event, payload){
    event.preventDefault();
    const userId = storage.get(USER).id;
    if(this.state.selectedCategories.length) {
      trackClient.post(userId, payload)
        .then(response => response.json())
        .then(body => {
           if(body.success) {
            this.setState({
              selectedTrack: null,
              selectedCategories: [],
              saveMessage: body.success
            })
          } else {
            this.setState({
              saveMessage: body.error
            })
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
    else {
      this.setState({
        saveMessage: "You must select one or more categories!"
      })
    }
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
                        categories: this.state.selectedCategories
                      }
      return <TrackForm
               id={selectedTrack.id}
               title={selectedTrack.name}
               artists={createArtistList(selectedTrack.artists)}
               album={selectedTrack.album.name}
               albumCover={selectedTrack.album.images[1].url}
               duration={convert.msToMinsAndSecs(selectedTrack.duration_ms)}
               handleSubmit={(event) => this.addTrack(event, payload)}
               handleInputChange={(id) => this.onSelectCategory(id)}
             />
    }
  }

  render() {
    return(
      <div className="text-center">
      <div className="save-message">
        {this.state.saveMessage}
      </div>
        {this.renderSearchResultsOrForm()}
      </div>
    )
  }
}

export default NewTrackContainer
