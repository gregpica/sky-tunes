import React from 'react';

class TrackPlayer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div>
        <div>Track Player Page</div>
        <a href="/tracks/new"><button>Add New Track</button></a>
      </div>
    )
  }
}

export default TrackPlayer
