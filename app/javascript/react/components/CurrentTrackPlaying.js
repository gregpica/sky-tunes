import React from 'react'

const CurrentTrackPlaying = props => {
  return (
    <div>
      <img className="playing-album-cover" src={props.albumCover} alt="album cover"/>
      <h3 className="playing-title">{props.title}</h3>
      <p>{props.artists}</p>
      <div className="small-8 medium-4 large-3 small-centered columns">
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
