export default (artists) => {
  return artists.map(artistObject => {
          return artistObject.name
         }).join(', ')
}
