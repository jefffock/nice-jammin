import { Link, Outlet, useParams } from 'react-router-dom'
import CurrentSelection from './CurrentSelection'
import { useEffect } from 'react'

function SongPicker ({ artists, artist, songs, filteredSongs, song, version, fetchArtists,
  fetchSongs, songSearchTerm, setSongSearchTerm, setArtist, setSong, setVersion }) {

    let params = useParams()

  function handleSongClick(song) {
    setVersion(null)
    setSong(song)
  }

  useEffect(() => {
    if (artists) {
      let correctArtist = (artist) => JSON.stringify(artist.id) === params.artistId
      let index = artists.findIndex(correctArtist)
      setArtist(artists[index])
    }
  }, [artist, artists, params, setArtist])

  return (
    <>
    <CurrentSelection artist={artist} song={song} version={version}
    setArtist={setArtist} setSong={setSong} setVersion={setVersion}/>
    <Outlet />
    {params && !params.songId && params['*'] !== 'add-song' &&
      <div className="song-picker-container">
        <div className="song-picker-wrapper">
          <p className="title">Choose a song:</p>
          <div className="title">
            <input
            className="inputField search-bar"
            type="song"
            placeholder="Search for a song..."
            value={songSearchTerm}
            onChange={(e) => {
              setSongSearchTerm(e.target.value)}}></input>
          </div>
      {!filteredSongs &&
      <h3>Loading Songs...</h3>}
      {filteredSongs &&
      filteredSongs.map((song, index) => {
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
        <button className="small-button"><Link to="add-song" style={{ textDecoration: 'none' }}>Add a Song</Link></button>
        <br></br><br></br>
      </div>
        </div>
      </div>
    }
    </>
  )
}

export default SongPicker