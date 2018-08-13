import React from 'react'

const CurrentTrackPlaying = props => {
  return (
    <div>
      <img src={props.albumCover} alt="album cover"/>
      <h3>{props.title}</h3>
      <p>{props.artists}</p>
      <div className="small-3 small-centered columns">
        <div className="row wrapper">
          <span className="small-4 columns" onClick={props.onPrevClick}>
            <i className="fas fa-step-backward next-prev-icon"></i>
          </span>
          <span className="small-4 columns" onClick={props.onPlayClick}>
            <i className={`${props.playToggleClass} play-icon`}></i>
          </span>
          <span className="small-4 columns" onClick={props.onNextClick}>
            <i className="fas fa-step-forward next-prev-icon"></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentTrackPlaying
