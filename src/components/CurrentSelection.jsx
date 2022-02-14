import { useEffect, useState } from 'react'
import { supabase } from './../supabaseClient'

function CurrentSelection(props) {
  const [wrapperClasses, setWrapperClasses] = useState('current-selection-wrapper hidden')
  const [linkToAdd, setLinkToAdd] = useState('')
  const [addLinkStatus, setAddLinkStatus] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    if (props.artist) {
      setWrapperClasses('current-selection-wrapper')
    } else {
      setWrapperClasses('current-selection-wrapper hidden')
    }
  }, [props])

  async function insertAddLink() {
    props.setLinkAdded(true)
    setButtonDisabled(true)
    setAddLinkStatus('Adding link...')
    if (!props.username) {
      setAddLinkStatus('Please log in to contribute')
    } else {
      const { data, error } = await supabase
        .from('add_link')
        .insert({
          link: linkToAdd,
          version_id: props.version.id,
          username: props.username
        })
      if (error) {
        console.log('error inserting add link', error)
        setAddLinkStatus('Unable to add a link at this time.')
        setButtonDisabled(false)
      } else {
        console.log('data from insert add link', data)
        updateVersionWithLink()
      }
    }
  }

  async function updateVersionWithLink() {
    const { error } = await supabase
      .from('versions')
      .update({
        listen_link: linkToAdd
      })
      .match({id: props.version.id})
    if (error) {
      console.log('error adding link', error)
      setAddLinkStatus('Unable to add a link at this time.')
      setButtonDisabled(false)
    } else {
      setAddLinkStatus('Link added. Thanks for contributing!')
      props.addTenPoints(props.username)
      props.fetchVersions(props.song.id)
      props.setShowAddLink(false)
      setLinkToAdd('')
    }
  }

  return (
    <>
    <div className={wrapperClasses}>
      <div className="current-selection-div">
        <h2>Fans&nbsp;helping&nbsp;fans find&nbsp;jams</h2>
        {props.artist &&
        <div className="current-selection-item">
        <h2 className="current-selection-text" onClick={e => {
          props.setShowArtistPicker(true)
          props.setArtist(null)
          props.setSong(null)
          props.setVersion(null)
          props.setShowAddSong(false)
          props.setShowAddVersion(false)
          props.setShowAddRating(false)
          props.setSongName(null)
          props.setSongSearchTerm('')
        }}>{props.artist.artist}</h2>
        </div>}
        {props.song &&
        <div className="current-selection-item">
          <h2 className="current-selection-text" onClick={e => {
            props.setSong(null)
            props.setSongName(null)
            props.setVersion(null)
            props.setShowAddSong(false)
            props.setShowAddVersion(false)
            props.setShowAddRating(false)
          }}>{props.song.song}</h2>
        </div>}
        <div className="current-selection-item">
          {props.version &&
          <>
          <h2 className="current-selection-text" onClick={e => {
            props.setVersion(null)
            props.setShowAddSong(false)
            props.setShowAddVersion(false)
            props.setShowAddRating(false)
          }}>{props.version.date}</h2>
          </>}
         </div>
          {props.version && props.version.submitter_name &&
            <>
            <p className="location">{props.version.location}</p><br></br>
          <div className="current-selection-item current-selection-name-points">
            <p>Added by</p>
            <p className="name">{props.version.submitter_name}</p>
            <p className="points">{props.version.points}</p>
          </div>
          {!props.showAddRating &&
            <>
          <div className="action-button-wrapper">
          <button className="primary-button action-button"
          onClick={e => props.setShowAddRating(true)}
          >Rate this {props.song.song}</button>
        </div>
            </>
          }
        </>
          }
          {props.version && props.version.listen_link &&
           <>
             <div className="listen-link">
               <br></br>
               <a className="listen-link link" href={props.version.listen_link}>Listen Here</a><br></br><br></br>
             </div>
           </>
          }
          {props.version && !props.version.listen_link && !props.showAddLink && !props.linkAdded &&
          <>
          <br></br>
          <div className="center-content">
          <button className="small-button"
          onClick={e => props.setShowAddLink(true)}>Add a 'Listen Here' link</button>
          </div>
          </>}
          {props.version && props.showAddLink &&
          <>
          <br></br><br></br>
          <div className="center-content">
            <p className="center-text">Add audio link here:</p>
            </div>
          <div className="center-content">
            <input
              className="inputField search-bar audio-input"
              type="link"
              placeholder="YouTube, Archive.org, etc."
              value={linkToAdd}
              onChange={(e) => {
            setLinkToAdd(e.target.value);
            }}/>
          </div>
          <div className="center-content">
            <button className="small-button" disabled={buttonDisabled}
            onClick={e => insertAddLink()}>Add this link</button>
          </div>
          </>}
          {props.linkAdded &&
          <div className="center-content">
            <p className="status">{addLinkStatus}</p>
          </div>
          }

        </div>
    </div>
        </>

  )
}

export default CurrentSelection