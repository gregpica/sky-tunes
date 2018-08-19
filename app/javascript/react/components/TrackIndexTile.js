import React from 'react'

const TrackIndexTile = props => {
  return (
    <div className="index-tile">
      <span className="small-12 columns wrapper">
        <img className="small-1 columns" src={props.albumCover} alt="album cover" />
        <span className="small-4 columns">{props.title}</span>
        <span className="small-3 columns">{props.artists}</span>
        <span className="small-2 columns">{props.album}</span>
        <span className="small-1 columns">{props.duration}</span>
        <i className={`${props.dropDownIcon} small-1 columns`} onClick={props.dropDownTrack}></i>
      </span>
      <div className={props.hidden}>
        <span className="small-12 columns wrapper">
          <div className="row text-center hey">
            <button className="small-2 columns edit-delete">Edit</button>
            <button className="small-2 columns edit-delete" onClick={props.handleDelete}>Delete</button>
          </div>
        </span>
      </div>

    </div>
  )
}


export default TrackIndexTile