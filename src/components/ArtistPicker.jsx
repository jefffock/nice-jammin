import { Link, useParams, Outlet } from 'react-router-dom'

function ArtistPicker(props) {
  let params = useParams()

  return (
    <>
    {!params.artistId &&
    <div className={"artist-picker-container"}>
      <div className="artist-picker-wrapper">
        <br></br>
        {!props.artist && !props.artists &&
        <h3>Loading artists...</h3>}
        {!props.artist && props.artists &&
          props.artists.map((artist, index) => {
            return (
              <div className="artist" key={index}>
                <Link to={JSON.stringify(artist.id)}>
                  <button className="button-in-list-large"
                  onClick={() => props.setArtist(artist)}>{artist.artist}!</button>
                </Link>
              </div>
            )
          })}
      </div>
    </div>}
    <Outlet />
    </>
  )
}

export default ArtistPicker