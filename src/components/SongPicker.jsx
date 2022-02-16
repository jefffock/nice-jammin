import { Link, Outlet, useParams, useNavigate } from 'react-router-dom'
import CurrentSelection from './CurrentSelection'
import { useEffect } from 'react'

function SongPicker ({ artists, artist, songs, filteredSongs, song, version, fetchArtists, addTenPoints, fetchVersions, username, versions,
  fetchSongs, songSearchTerm, setSongSearchTerm, setArtist, setSong, setVersion, showAddLink, setShowAddLink, linkAdded, setLinkAdded,
  user, addOnePoint, canWrite, calcAverageForVersion, fetchRatings, addRatingCountToArtist, addRatingCountToSong }) {

  let params = useParams()
  let navigate = useNavigate()

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

  function handleAddSongClick() {
    navigate('add-song')
  }

  return (
    <>
    <CurrentSelection artist={artist} song={song} version={version} versions={versions} username={username}
    setArtist={setArtist} setSong={setSong} setVersion={setVersion} user={user}
    showAddLink={showAddLink} setShowAddLink={setShowAddLink} linkAdded={linkAdded}
    setLinkAdded={setLinkAdded} addTenPoints={addTenPoints} fetchVersions={fetchVersions}
    addOnePoint={addOnePoint} canWrite={canWrite} calcAverageForVersion={calcAverageForVersion}
    fetchRatings={fetchRatings} addRatingCountToSong={addRatingCountToSong} addRatingCountToArtist={addRatingCountToArtist}/>
    <Outlet />
    {params && !params.songId && params['*'] !== 'add-song' &&
      <div className="song-picker-container">
        <div className="song-picker-wrapper">
          <p className="title">choose a song:</p>
          <div className="title">
            <input
            className="inputField search-bar"
            type="song"
            placeholder="search for a song..."
            value={songSearchTerm}
            onChange={(e) => {
              setSongSearchTerm(e.target.value)}}></input>
          </div>
      {!filteredSongs &&
      <h3>loading songs...</h3>}
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
        <button className="small-button" onClick={() => {handleAddSongClick()}}>add a song</button>
        <br></br><br></br>
      </div>
        </div>
      </div>
    }
    </>
  )
}

export default SongPicker