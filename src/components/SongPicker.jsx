import { Link, useParams, Outlet } from 'react-router-dom'
import CurrentSelection from './CurrentSelection'

function SongPicker (props) {

  let params = useParams()

  return (
    <>
    <CurrentSelection artist={props.artist} song={props.song}/>
    {!params.songId &&
      <div className="song-picker-container">
        <div className="song-picker-wrapper">
      <input
        className="inputField search-bar"
        type="song"
        placeholder="Search for a song..."
        value={props.songSearchTerm}
        onChange={(e) => {
          props.setSongSearchTerm(e.target.value)}}></input>
          <br></br>
          <br></br>
      {!props.filteredSongs &&
      <h3>Loading Songs...</h3>}
      {props.filteredSongs &&
      props.filteredSongs.map((song, index) => {
        return (
          <div className="song" key={index}>
            <Link to={`songs/${song.id}`}>
              <button className="button-in-list-large"
              onClick={() => props.setSong(song)}>{song.song}</button>
            </Link>
          </div>
          )
        })}

      <>
      <br></br>
      <br></br>
      <button className="small-button"
      onClick={e => props.handleShowAddSong(props.songSearchTerm)}>Add a Song</button>
      </>
      <br></br>
      <br></br>
        </div>
      </div>
    }
    {params.songId &&
    <Outlet />}
    </>
  )
}

export default SongPicker