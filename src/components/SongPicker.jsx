import { Link, useParams, Outlet } from 'react-router-dom'
import CurrentSelection from './CurrentSelection'
import { useEffect } from 'react'

function SongPicker (props) {

  let params = useParams()

  function handleSongClick(song) {
    props.setVersion(null)
    props.setSong(song)
  }

  useEffect(() => {
    let artists = props.artists
    console.log('artists', artists)
    if (!artists) {
      props.fetchArtists()
    } else {
      let artist = props.artist
      console.log('artist', artist)
      if (!props.artist) {
        if (params.artistId) {
          let correctArtist = (artist) => JSON.stringify(artist.id) === params.artistId
          let index = artists.findIndex(correctArtist)
          props.setArtist(artists[index])
        }
      }
    }
  })

  return (
    <>
    <CurrentSelection artist={props.artist} song={props.song} version={props.version}
    setArtist={props.setArtist} setSong={props.setSong} setVersion={props.setVersion}/>
    {!params.songId &&
      <div className="song-picker-container">
        <div className="song-picker-wrapper">
          <p className="title">Choose a song:</p>
          <div className="title">
            <input
            className="inputField search-bar"
            type="song"
            placeholder="Search for a song..."
            value={props.songSearchTerm}
            onChange={(e) => {
              props.setSongSearchTerm(e.target.value)}}></input>
          </div>
      {!props.filteredSongs &&
      <h3>Loading Songs...</h3>}
      {props.filteredSongs &&
      props.filteredSongs.map((song, index) => {
        return (
          <div className="song" key={index}>
            <Link to={`songs/${song.id}`} style={{ textDecoration: 'none' }}>
              <span className="item-in-list-large"
              onClick={() => handleSongClick(song)}>{song.song}</span>
            </Link>
          </div>
          )
        })}
      <div className="title">
        {/* <Link to="/add-song">Add a Song</Link> */}
        <button className="small-button"><Link to="/add-song" style={{ textDecoration: 'none' }}>Add a Song</Link></button>
        <br></br><br></br>
      </div>
        </div>
      </div>
    }
    {params.songId &&
    <Outlet />}
    </>
  )
}

export default SongPicker