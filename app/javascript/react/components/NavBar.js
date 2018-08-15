import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = props => {
  return(
    <div>
      <div className="navbar">
        <Link to='/track-player' className="nav-link">SkyTunes</Link>
        <Link to='/tracks' className="nav-link nav-tracks">My Tracks</Link>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default NavBar;
