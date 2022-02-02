
function ArtistPicker(props) {

  return (
    <>
    <div className={"artist-picker-container"}>
      <div className="artist-picker-wrapper">
        <br></br>
        {!props.artist && !props.artists &&
        <h3>Loading artists...</h3>}
        {!props.artist && props.artists &&
          props.artists.map(artist => {
            return (
              <button className="button-in-list-large"
              onClick={() => props.setArtist(artist)}>{artist.artist}</button>
            )
          })}
      </div>
    </div>
    </>
  )
}

export default ArtistPicker