import React from 'react';
import searchClient from '../clients/search';
import SearchResultTile from '../components/SearchResultTile';
import convert from '../util/convert';
import { debounce } from 'lodash';

const createArtistList = (artists) => {
  return artists.map(artistObject => {
          return artistObject.name
         }).join(', ')
}

class Search extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     query: null,
     tracks: [],
     selectedTrack: null
    };
    this.debouncedSearchSpotify = debounce(this.searchSpotify, 300);
    this.handleChange = this.handleChange.bind(this);
    this.onSelectTrack = this.onSelectTrack.bind(this);

 }

 handleChange({ target: { value } }) {
   this.setState({ query: value });
   if(value) {
     this.debouncedSearchSpotify(value);
   } else {
     this.debouncedSearchSpotify.cancel();
     this.setState({ tracks: [] })
   }
 }

 searchSpotify(query) {
   searchClient.get(query)
     .then(response => response.json())
     .then(body =>
       this.setState({
         tracks: body.tracks.items
       })
     )
     .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 onSelectTrack(id) {
   this.setState({
     selectedTrack: id
   })
 }

 render() {

   let resultDiv;
   if (!this.state.selectedTrack) {
     resultDiv = this.state.tracks.map(track => {
       return <SearchResultTile
                 key={track.id}
                 title={track.name}
                 artists={createArtistList(track.artists)}
                 album={track.album.name}
                 albumCover={track.album.images[1].url}
                 duration={convert.msToMinsAndSecs(track.duration_ms)}
                 onClick={() => this.onSelectTrack(track.id)}
              />
    });
  } else {
    const selectedTrack = this.state.tracks.find(track => track.id === this.state.selectedTrack)
    return <SearchResultTile
      title={selectedTrack.name}
      artists={createArtistList(selectedTrack.artists)}
      album={selectedTrack.album.name}
      albumCover={selectedTrack.album.images[1].url}
      duration={convert.msToMinsAndSecs(selectedTrack.duration_ms)}
    />
  }


   return (
     <form>
       <input
         placeholder="Search for..."
         ref={input => this.search = input}
         onChange={this.handleChange}
       />
       {resultDiv}
     </form>
   )
 }
}

export default Search
