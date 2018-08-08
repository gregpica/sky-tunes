import React from 'react';
import Search from './Search';

class AddTrackContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {

    return(
      <div>
        <div> Welcome to the Add Track page </div>
        <Search />
      </div>
    )
  }
}

export default AddTrackContainer
