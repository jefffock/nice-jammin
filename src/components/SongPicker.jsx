function SongPicker (props) {

  return (
    <>
    {props.filteredSongs.length > 0 && props.artist.artist && !props.song &&
      <>
      <p>Choose a song:</p>
      <br></br>
      </>}
      {props.songs && props.songs.length > 0 && !props.song && props.artist.artist && !props.showAddSong && !props.showAddVersion && !props.showAddRating &&
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
      {props.songs && props.filteredSongs && !props.song && props.artist.artist && !props.showAddSong && !props.showAddVersion && !props.showAddRating &&
      props.filteredSongs.map(song => {
        return (
          <button className="button-in-list-large"
          onClick={() => props.setSong(song)}>{song.song}</button>
          )
        })}
      {!props.song && props.artist.artist && !props.showAddSong && !props.showAddVersion && !props.showAddRating &&
      <>
      <br></br>
      <br></br>
      <p>Not seeing the song you're looking for?</p>
      <br></br>
      <button className="small-button"
      onClick={e => props.handleShowAddSong(props.songSearchTerm)}>Add a Song</button>
      </>}
    </>
  )
}

export default SongPicker