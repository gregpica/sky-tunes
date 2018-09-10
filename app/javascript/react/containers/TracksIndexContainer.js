import React from 'react';
import TrackIndexTile from '../components/TrackIndexTile';
import convert from '../util/convert';
import createArtistList from '../util/createArtistList';
import trackClient from '../clients/track';
import categoryClient from '../clients/category';
import storage from '../util/storage';
import { USER, CANCEL_EDIT_MESSAGE, DELETE_MESSAGE, NO_CATEGORY_MESSAGE } from '../constants';

class TracksIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: [],
      droppedDownTracks: [],
      changeMessage: null,
      allCategories: [],
      editMode: [],
      selectedCategories: {},
      edited: []
    }

    this.getTrackIndexTiles = this.getTrackIndexTiles.bind(this);
    this.dropDownTrack = this.dropDownTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.getStoredCategories = this.getStoredCategories.bind(this);
    this.getSelectedCategories = this.getSelectedCategories.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
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
    categoryClient.get()
      .then(response => response.json())
      .then(body => {
        this.setState({
          allCategories: body.categories
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
    if (window.confirm(DELETE_MESSAGE)) {
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

  editTrack(event, trackId, categoryIds) {
    event.preventDefault();
    if(categoryIds.length) {
      const userId = storage.get(USER).id;
      const payload = {
        categories: categoryIds
      }
      trackClient.editTrack(userId, trackId, payload)
        .then(response  => response.json())
        .then(body => {
          if(body.success) {
           this.state.edited.push(trackId)
           this.setState({
             changeMessage: body.success,
             droppedDownTracks: this.state.droppedDownTracks.filter(id => id !== trackId),
             edited: this.state.edited,
             editMode: this.state.editMode.filter(id => id !== trackId)
           })
         } else {
           this.setState({
             changeMessage: body.error
           })
         }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`))
    } else {
      this.setState({
        changeMessage: NO_CATEGORY_MESSAGE
      })
    }
  }

  getStoredCategories(id) {
    const track = this.state.tracks.find(track => track.id === id)
    return track.categories.map(category => category.id)
  }

  handleEditClick(id) {
    this.state.editMode.push(id)
    let obj = this.state.selectedCategories
    obj[id] = this.getStoredCategories(id)
    this.setState({
      editMode: this.state.editMode,
      selectedCategories: obj
    })
  }

  cancelEdit(trackId) {
    if (window.confirm(CANCEL_EDIT_MESSAGE)) {
      this.setState({
        editMode: this.state.editMode.filter(id => id !== trackId)
      })
    }
  }

  getSelectedCategories(id) {
    if (!this.state.editMode.includes(id) && !this.state.edited.includes(id)) {
      return this.getStoredCategories(id)
    } else {
      return this.state.selectedCategories[id]
    }
  }

  onSelectCategory(trackId, categoryId) {
    const { selectedCategories } = this.state;

    if(selectedCategories[trackId].includes(categoryId)) {
      const updatedCategories = selectedCategories[trackId].filter(id => id !== categoryId)
      selectedCategories[trackId] = updatedCategories
      this.setState({
        selectedCategories: selectedCategories
      })
    } else {
      selectedCategories[trackId].push(categoryId)
      this.setState({
        selectedCategories: selectedCategories
      })
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
         handleEditClick={() => this.handleEditClick(track.id)}
         editMode={this.state.editMode.includes(track.id)}
         allCategories={this.state.allCategories}
         trackCategories={this.getSelectedCategories(track.id)}
         handleInputChange={(categoryId) => this.onSelectCategory(track.id, categoryId)}
         handleSubmit={(event) => this.editTrack(event, track.id, this.state.selectedCategories[track.id])}
         cancelEdit={() => this.cancelEdit(track.id)}
      />
    })
  }

  render() {

    return(
      <div>
        <div className="text-center">
          <div className="save-message">
            {this.state.changeMessage}
          </div>
        </div>
        <div className="index-labels">
          <span className="small-12 columns wrapper">
            <span className="small-1 columns img-spot"><br></br></span>
            <span className="small-4 columns">TITLE</span>
            <span className="small-4 medium-3 columns">ARTIST</span>
            <span className="small-0 medium-2 columns">ALBUM</span>
            <span className="small-0 medium-1 columns clock-spot"><i className="far fa-clock"></i></span>
            <span className="small-1 columns"><br></br></span>
          </span>
        </div>
        {this.getTrackIndexTiles()}
      </div>
    )
  }
}

export default TracksIndexContainer
