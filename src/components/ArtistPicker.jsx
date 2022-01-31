function ArtistPicker(props) {

  return (
    <>
     {!props.artist &&
        <p>Choose an artist:</p>}
        <br></br>
        {!props.artist && props.artists &&
          props.artists.map(artist => {
            return (
              <button className="button-in-list-large"
              onClick={() => props.setArtist(artist)}>{artist.artist}</button>
            )
          })}
    </>
  )
}

export default ArtistPicker