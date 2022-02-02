
function SongPicker (props) {

  return (
    <>
      <div className="song-picker-container">
        <div className="song-picker-wrapper">
      {props.showSongPicker &&
      <>
      <input
        className="inputField search-bar"
        type="song"
        placeholder="Search for a song..."
        value={props.songSearchTerm}
        onChange={(e) => {
          props.filterSongs(e.target.value)}}></input>
          <br></br>
          <br></br>
      </>}
      {props.filteredSongs && props.showSongPicker &&
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
      <button className="small-button"
      onClick={e => props.handleShowAddSong(props.songSearchTerm)}>Add a Song</button>
      </>}
      <br></br>
      <br></br>
        </div>
      </div>
    </>
  )
}

export default SongPicker