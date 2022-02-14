import { Link, useParams, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

function ArtistPicker(props) {
  let params = useParams()

  useEffect(() => {
    props.setArtist(null)
    props.setSong(null)
    props.setVersion(null)
  }, [])

  function handleArtistClick(artist)  {
    props.setArtist(artist)
  }

  return (
    <>
    {!params.artistId &&
    <>
    <div className="subheading-wrapper">
      <h2 className="subheading">Fans&nbsp;helping&nbsp;fans&nbsp;find&nbsp;jams</h2>
    </div>
    <div className={"artist-picker-container"}>
      <div className="artist-picker-wrapper">
        <h2 className="title">bands<br></br>beyond<br></br>description</h2>
        <br></br>
        <p className="title">Choose&nbsp;one&nbsp;to&nbsp;get&nbsp;started:<br></br><br></br></p>
        {!props.artist && !props.artists &&
        <h3>Loading artists...</h3>}
        {!props.artist && props.artists &&
          props.artists.map((artist, index) => {
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