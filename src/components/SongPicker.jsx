function SongPicker (props) {

  return (
    <>
      <div className="song-picker-container">
        <div className="song-picker-wrapper">

      {props.showSongPicker &&
      <>
      <h3>Choose a song:</h3>
      <br></br>
      </>}
      {props.showSongPicker &&
      <>
      <input
        className="inputField"
        type="song"
        placeholder="Search for a song..."
        value={props.songSearchTerm}
        onChange={(e) => {
          props.filterSongs(e.target.value)}}></input>
          <br></br>
          <br></br>
      </>}
      {props.songs && props.showSongPicker &&
      props.filteredSongs.map(song => {
        return (
          <button className="button-in-list-large"
          onClick={() => props.setSong(song)}>{song.song}</button>
          )
        })}
      {props.showSongPicker &&
      <>
      <br></br>
      <br></br>
      <p>Not seeing the song you're looking for?</p>
      <br></br>
      <button className="small-button"
      onClick={e => props.handleShowAddSong(props.songSearchTerm)}>Add a Song</button>
      </>}
        </div>
      </div>
    </>
  )
}

export default SongPicker