import { useNavigate } from 'react-router-dom'

function BackButtons({ artist, song, version, setArtist, setSong, setVersion, setShowingAddRating}) {

  let navigate = useNavigate()

  function handleChangeArtistClick() {
    setShowingAddRating(false)
    setArtist(null)
    setSong(null);
    setVersion(null);
    navigate('/')
  }

  function handleChangeSongClick() {
    setShowingAddRating(false)
    setSong(null);
    setVersion(null);
    navigate(`/artists/${artist.id}`)
  }

  function handleChangeVersionClick() {
    setShowingAddRating(false)
    setVersion(null);
    navigate(`/artists/${artist.id}/songs/${song.id}`)
  }

    return (
      <div className="back-buttons-div">
      {artist &&
      <>
      <button className="back small-button"
      onClick={() => handleChangeArtistClick()}>Artists</button>
        <br></br>
      </>}
      {song &&
      <>
      <button className="back small-button"
      onClick={() => handleChangeSongClick()}>Songs</button>
        <br></br>
      </>}
      {version &&
      <>
      <button className="back small-button"
      onClick={() => handleChangeVersionClick()}>Versions</button>
      </>}
    </div>
    )
}

export default BackButtons