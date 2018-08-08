import React from 'react'
import searchClient from '../clients/search';
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
   const resultDiv = this.state.tracks.map((track, i) => {
      return <p key={i}>{track.name}</p>
   });
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
