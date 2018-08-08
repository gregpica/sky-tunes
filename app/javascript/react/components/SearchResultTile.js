import React from 'react'

const SearchResultTile = props => {
  return (
    <div className="search-result" onClick={props.onClick} >
      <p>Title: {props.title}</p>
      <p>Artist: {props.artists}</p>
      <p>Album: {props.album}</p>
      <p>Duration: {props.duration}</p>
      <img src={props.albumCover} alt="album cover"/>
    </div>
  )
}

export default SearchResultTile
