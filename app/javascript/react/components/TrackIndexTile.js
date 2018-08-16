import React from 'react'

const TrackIndexTile = props => {
  return (
    <div className="index-tile">
      <span className="small-12 columns wrapper">
        <img className="small-1 columns" src={props.albumCover} alt="album cover" />
        <span className="small-4 columns">{props.title}</span>
        <span className="small-3 columns">{props.artists}</span>
        <span className="small-3 columns">{props.album}</span>
        <span className="small-1 columns">{props.duration}</span>
      </span>
    </div>
  )
}

// <div className="small-3 small-centered columns">
//   <div className="row wrapper">
//     <span className="small-4 columns" onClick={props.onPrevClick}>
//       <i className="fas fa-step-backward next-prev-icon"></i>
//     </span>
//     <span className="small-4 columns" onClick={props.onPlayClick}>
//       <i className={`${props.playToggleClass} play-icon`}></i>
//     </span>
//     <span className="small-4 columns" onClick={props.onNextClick}>
//       <i className="fas fa-step-forward next-prev-icon"></i>
//     </span>
//   </div>
// </div>

export default TrackIndexTile
