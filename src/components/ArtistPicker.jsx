function ArtistPicker(props) {

  return (
    <>
     {!props.artist &&
        <p>Choose an artist:</p>}
        <br></br>
        {!props.artist && props.artists &&
          props.artists.map(artist => {
            return (
              <button className="button-in-list"
              onClick={() => props.handleArtistChange(artist.artist)}>{artist.artist}</button>
            )
          })}
    </>
  )
}

export default ArtistPicker