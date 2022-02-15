import { useEffect, useState } from 'react'
import { supabase } from './../supabaseClient'

function CurrentSelection({ artist, song, version, versions, setArtist, setSong, setVersion, showAddLink,
  setShowAddLink, linkAdded, setLinkAdded, addTenPoints, fetchVersions, username}) {
  // const [wrapperClasses, setWrapperClasses] = useState('current-selection-wrapper hidden')
  const [linkToAdd, setLinkToAdd] = useState('')
  const [addLinkStatus, setAddLinkStatus] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  // useEffect(() => {
  //   if (props.artist) {
  //     setWrapperClasses('current-selection-wrapper')
  //   } else {
  //     setWrapperClasses('current-selection-wrapper hidden')
  //   }
  // }, [props])

  useEffect(() => {
    console.log('versions in currentSelection', versions)
    console.log('version in currentSelection', version)
  })

  async function insertAddLink() {
    setLinkAdded(true)
    setButtonDisabled(true)
    setAddLinkStatus('Adding link...')
    if (!username) {
      setAddLinkStatus('Please log in to contribute')
    } else {
      const { data, error } = await supabase
        .from('add_link')
        .insert({
          link: linkToAdd,
          version_id: version.id,
          username: username
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
      .match({id: version.id})
    if (error) {
      console.log('error adding link', error)
      setAddLinkStatus('Unable to add a link at this time.')
      setButtonDisabled(false)
    } else {
      setAddLinkStatus('Link added. Thanks for contributing!')
      addTenPoints(username)
      fetchVersions(song.id)
      setShowAddLink(false)
      setLinkToAdd('')
    }
  }

  return (
    <>
    <div className={artist ? 'current-selection-wrapper' : 'current-selection-wrapper hidden'}>
      <div className="current-selection-div">
        {artist &&
        <div className="current-selection-item">
        <h2 className="current-selection-text" onClick={e => {
          // setShowArtistPicker(true)
          setArtist(null)
          setSong(null)
          setVersion(null)
          // setShowAddSong(false)
          // setShowAddVersion(false)
          // setShowAddRating(false)
          // setSongName(null)
          // setSongSearchTerm('')
        }}>{artist.artist}</h2>
        </div>}
        {artist && song &&
        <div className="current-selection-item">
          <h2 className="current-selection-text" onClick={e => {
           setSong(null)
            // setSongName(null)
            setVersion(null)
            // props.setShowAddSong(false)
            // props.setShowAddVersion(false)
            // props.setShowAddRating(false)
          }}>{song.song}</h2>
        </div>}
        <div className="current-selection-item">
          {artist && song && version &&
          <>
          <h2 className="current-selection-text" onClick={() => {
            setVersion(null)
            // setShowAddSong(false)
            // setShowAddVersion(false)
            // setShowAddRating(false)
          }}>{version.date}</h2>
          </>}
         </div>
          {version && version.submitter_name &&
            <>
            <p className="location">{version.location}</p><br></br>
          <div className="current-selection-item current-selection-name-points">
            <p>Added by</p>
            <p className="name">{version.submitter_name}</p>
            <p className="points">{version.points}</p>
          </div>
          {version && song &&
            <>
          <div className="action-button-wrapper">
          <button className="primary-button action-button"
          // onClick={e => setShowAddRating(true)}
          >Rate this {song.song}</button>
        </div>
            </>
          }
        </>
          }
          {version && version.listen_link &&
           <>
             <div className="listen-link">
               <br></br>
               <a className="listen-link link" href={version.listen_link}>Listen Here</a><br></br><br></br>
             </div>
           </>
          }
          {version && !version.listen_link && !showAddLink && !linkAdded &&
          <>
          <br></br>
          <div className="center-content">
          <button className="small-button"
          onClick={e => setShowAddLink(true)}>Add a 'Listen Here' link</button>
          </div>
          </>}
          {version && showAddLink &&
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
          {linkAdded &&
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