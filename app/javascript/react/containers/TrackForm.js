import React from 'react';

class TrackForm extends React.Component {
 constructor(props) {
   super(props)
   this.state = {

    };
 }



 render() {

   return (
     <div>
       <div>Welcome to the Track Form</div>
       <p>Title: {this.props.title}</p>
       <p>Artist: {this.props.artists}</p>
       <p>Album: {this.props.album}</p>
       <p>Duration: {this.props.duration}</p>
       <img src={this.props.albumCover} alt="album cover"/>
     </div>
   )

 }

}

export default TrackForm
