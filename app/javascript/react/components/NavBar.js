import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = props => {
  return(
    <div>
      <div className="navbar">
        <Link to='/track-player' className="nav-link">SkyTunes</Link>
        <Link to='/tracks/new' className="nav-link nav-new-track">Add New Tracks</Link>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default NavBar;
