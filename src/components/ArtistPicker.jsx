import { Link, useParams, Outlet } from 'react-router-dom'

function ArtistPicker(props) {
  let params = useParams()

  return (
    <>
    <div className="subheading-wrapper">
      <h2 className="subheading">Fans&nbsp;helping&nbsp;fans&nbsp;find&nbsp;jams.<br></br>Thank&nbsp;you,&nbsp;contributors!</h2>
    </div>
    {!params.artistId &&
    <div className={"artist-picker-container"}>
      <div className="artist-picker-wrapper">
        <h2 className="title">bands<br></br>beyond<br></br>description</h2>
        <br></br>
        {!props.artist && !props.artists &&
        <h3>Loading artists...</h3>}
        {!props.artist && props.artists &&
          props.artists.map((artist, index) => {
            return (
              <div className="artist" key={index}>
                <Link to={JSON.stringify(artist.id)}>
                  <span className="item-in-list-large"
                  onClick={() => props.setArtist(artist)}>{artist.artist}</span>
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