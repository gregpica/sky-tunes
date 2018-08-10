import React from 'react';
import categoryClient from '../clients/category';

class TrackForm extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     categories: []
   };
 }

 componentDidMount() {
   categoryClient.get()
     .then(response => response.json())
     .then(body =>
       this.setState({
         categories: body
       })
     )
     .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 render() {

   return (
     <form onSubmit={this.props.handleSubmit}>
       <h1>Add new Track</h1>
       <div>
         <p>Title: {this.props.title}</p>
         <p>Artist: {this.props.artists}</p>
         <p>Album: {this.props.album}</p>
         <p>Duration: {this.props.duration}</p>
         <img src={this.props.albumCover} alt="album cover"/>
       </div>
       <button type="submit" value="Submit">Save</button>
     </form>
   )

 }
}

export default TrackForm
