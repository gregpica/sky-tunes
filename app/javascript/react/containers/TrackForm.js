import React from 'react';

class TrackForm extends React.Component {
 constructor(props) {
   super(props)
   this.state = {

    };
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
