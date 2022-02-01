import { useEffect, useState } from 'react'

function CurrentSelection(props) {
  const [wrapperClasses, setWrapperClasses] = useState('current-selection-wrapper hidden')

  useEffect(() => {
    if (props.artist) {
      setWrapperClasses('current-selection-wrapper')
    } else {
      setWrapperClasses('current-selection-wrapper hidden')
    }
  }, [props])

  return (
    <>
    <div className={wrapperClasses}>
      <div className="current-selection-div">
        <div className="current-selection-item">
        {props.artist &&
        <h2 onClick={e => {
          props.setShowArtistPicker(true)
          props.setArtist(null)
          props.setSong(null)
          props.setVersion(null)
          props.setShowAddSong(false)
          props.setShowAddVersion(false)
          props.setShowAddRating(false)
          props.setSongName(null)
          props.setSongSearchTerm('')
        }}>{props.artist.artist}</h2>}
        </div>
        <div className="current-selection-item">
          {!props.showAddVersion &&
          <h2 onClick={e => {
            props.setSong(null)
            props.setSongName(null)
            props.setVersion(null)
            props.setShowAddSong(false)
            props.setShowAddVersion(false)
            props.setShowAddRating(false)
          }}>{props.songName}</h2>}
        </div>
        <div className="current-selection-item">
          {props.version &&
          <>
          <h2 onClick={e => {
            props.setVersion(null)
            props.setShowAddSong(false)
            props.setShowAddVersion(false)
            props.setShowAddRating(false)
          }}>{props.version.date}</h2>
          </>}
         </div>
          {props.version && props.version.submitter_name &&
          <div className="current-selection-item current-selection-name-points">
            <p>Added by</p>
            <p className="name">{props.version.submitter_name}</p>
            <p className="points">{props.version.points}</p>
          </div>
          }
        </div>
    </div>
        </>

  )
}

export default CurrentSelection