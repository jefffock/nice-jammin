function CurrentSelection(props) {

  return (
    <>
    <div className="current-selection-div">
      {props.artist &&
      <h2 onClick={e => {
        props.setSong(null)
        props.setVersion(null)
        props.setShowAddSong(false)
        props.setShowAddVersion(false)
        props.setShowAddRating(false)
        props.setSongName(null)
        props.setSongSearchTerm('')
      }}>{props.artist.artist}</h2>}
          {!props.showAddVersion &&
          <h2 onClick={e => {
            props.setVersion(null)
            props.setShowAddSong(false)
            props.setShowAddVersion(false)
            props.setShowAddRating(false)
          }}>{props.songName}</h2>}
          {props.version &&
          <h2 onClick={e => {
            props.setShowAddSong(false)
            props.setShowAddVersion(false)
            props.setShowAddRating(false)
          }}>{props.version.date}</h2>}
        </div>
        </>

  )
}

export default CurrentSelection