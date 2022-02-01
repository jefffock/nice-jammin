function BackButtons(props) {

    return (
      <div className="back-buttons-div">
      {props.artist && !props.showAddSong && !props.showAddVersion && !props.showAddRating &&
      <>
      <button className="back small-button" onClick={e => { props.setArtist(null);
      props.setSong(null);
      props.setSongName(null)
      props.setVersion(null);
      props.setShowArtistPicker(true)}}>Change Artist</button>
        <br></br>
      </>}
      {props.song && !props.showAddSong && !props.showAddVersion && !props.showAddRating &&
      <>
      <button className="back small-button" onClick={e => {
        props.setSong(null);
        props.setSongName(null);
        props.setVersion(null);}}>Change Song</button>
        <br></br>
      </>}
      {props.version && !props.showAddSong && !props.showAddVersion && !props.showAddRating &&
      <>
      <button className="back small-button" onClick={e => {
        props.setVersion(null)}}>Change Version</button>
      </>}
      {props.artist &&
      <>
      <br></br>
      </>}
    </div>
    )
}

export default BackButtons