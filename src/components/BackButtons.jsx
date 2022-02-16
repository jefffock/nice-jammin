import { useNavigate } from 'react-router-dom'

function BackButtons({ artist, song, version, setArtist, setSong, setVersion}) {

  let navigate = useNavigate()

  function handleChangeArtistClick() {
    setArtist(null)
    setSong(null);
    setVersion(null);
    navigate('/')
  }

  function handleChangeSongClick() {
    setSong(null);
    setVersion(null);
    navigate(`/artists/${artist.id}`)
  }

  function handleChangeVersionClick() {
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