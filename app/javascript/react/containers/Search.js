import React from 'react';
import searchClient from '../clients/search';
import SearchResultTile from '../components/SearchResultTile';
import createArtistList from '../util/createArtistList'
import { debounce } from 'lodash';

class Search extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     query: null,
     tracks: []
   };
    this.debouncedSearchSpotify = debounce(this.searchSpotify, 300);
    this.handleChange = this.handleChange.bind(this);
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

 render() {

   const resultDiv = this.state.tracks.map(track => {
     return <SearchResultTile
               key={track.id}
               title={track.name}
               artists={createArtistList(track.artists)}
               album={track.album.name}
               albumCover={track.album.images[1].url}
               onClick={() => this.props.handleSelect(track)}
            />
    });

   return (
     <div className="small-6 small-centered columns">
      <div className="row wrapper">
         <form>
          <div className="search-bar">
             <input
               placeholder="Search for tracks..."
               ref={input => this.search = input}
               onChange={this.handleChange}
             />
          </div>
           {resultDiv}
         </form>
       </div>
     </div>
   )
 }
}

export default Search
