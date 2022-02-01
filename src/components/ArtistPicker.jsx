function ArtistPicker(props) {

  return (
    <>
    <div className="artist-picker-container">
      <div className="artist-picker-wrapper">
      {!props.artist &&
        <h3>Choose an artist:</h3>}
        <br></br>
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