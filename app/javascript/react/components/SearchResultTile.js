import React from 'react'

const SearchResultTile = props => {
  return (
    <div className="search-result row" onClick={props.onClick} >
      <div className="columns small-5 medium-3">
        <img src={props.albumCover} alt="album cover" height="130" width="130"/>
      </div>
      <div className="columns small-7 medium-9">
        <h5>{props.title}</h5>
        <p>{props.artists} - {props.album}</p>
      </div>
    </div>
  )
}

export default SearchResultTile
