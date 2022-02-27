import { Link, useParams, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

function ArtistPicker({ artists, setArtist, setSong, setVersion, artist, fetchArtists }) {
  let params = useParams()

  // useEffect(() => {
  //   setArtist(null)
  //   setSong(null)
  //   setVersion(null)
  //   if (!artists) {
  //     fetchArtists()
  //   }
  // }, [setArtist, setSong, setVersion, artists, fetchArtists])

  function handleArtistClick(artist)  {
    console.log('in handleArtistClick')
    console.log('artist', artist)
    setArtist(artist)
  }

  return (
    <>
    {!params.artistId &&
    <>
    <div className="subheading-wrapper">
      <h2 className="subheading">fans&nbsp;helping&nbsp;fans&nbsp;find&nbsp;jams</h2>
    </div>
    <div className={"artist-picker-container"}>
      <div className="artist-picker-wrapper">
        <h2 className="title">bands<br></br>beyond<br></br>description</h2>
        <br></br>
        <p className="title">choose&nbsp;one&nbsp;to&nbsp;get&nbsp;started:<br></br><br></br></p>
        {!artist && !artists &&
        <h3>Loading artists...</h3>}
        {!artist && artists &&
          artists.map((artist, index) => {
            return (
              <div className="artist" key={index}>
                <Link to={JSON.stringify(artist.id)} style={{ textDecoration: 'none' }}>
                  <span className="item-in-list-large"
                  onClick={() => handleArtistClick(artist)}>{artist.artist}</span>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
    </>}
    <Outlet />
    </>
  )
}

export default ArtistPicker