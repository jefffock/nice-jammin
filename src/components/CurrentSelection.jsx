import BackButtons from './BackButtons'
import AddRating from './addRating'
import { useState } from 'react'
import { supabase } from './../supabaseClient'

function CurrentSelection({ artist, song, version, versions, setArtist, setSong, setVersion, showAddLink,
  setShowAddLink, linkAdded, setLinkAdded, addTenPoints, fetchVersions, username, user,
  canWrite, addOnePoint, calcAverageForVersion, fetchRatings, addRatingCountToSong, addRatingCountToArtist }) {
  const [linkToAdd, setLinkToAdd] = useState('')
  const [addLinkStatus, setAddLinkStatus] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [showingAddRating, setShowingAddRating] = useState(false)
  const [ratingAdded, setRatingAdded] = useState(false)

  async function insertAddLink() {
    setLinkAdded(true)
    setButtonDisabled(true)
    setAddLinkStatus('Adding link...')
    if (!username) {
      setAddLinkStatus('Please log in to contribute')
    } else {
      const { error } = await supabase
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

  function handleAddRatingClick() {
    setShowingAddRating(true)
    setRatingAdded(false)
  }

  return (
    <>
    <BackButtons artist={artist} song={song} version={version} setArtist={setArtist} setSong={setSong} setVersion={setVersion}
    setShowingAddRating={setShowingAddRating} setRatingAdded={setRatingAdded}/>
    <div className={artist ? 'current-selection-wrapper' : 'current-selection-wrapper hidden'}>
      <div className="current-selection-div">
        {artist &&
        <div className="current-selection-item">
        <h2 className="current-selection-text">{artist.artist}</h2>
        </div>}
        {artist && song &&
        <div className="current-selection-item">
          <h2 className="current-selection-text">{song.song}</h2>
        </div>}
        <div className="current-selection-item">
          {artist && song && version &&
          <>
          <h2 className="current-selection-text">{version.date}</h2>
          </>}
         </div>
          {version && version.submitter_name &&
            <>
            <p className="location">{version.location}</p><br></br>
          <div className="current-selection-item current-selection-name-points">
            <p>added by</p>
            <p className="name">{version.submitter_name}</p>
            <p className="points">{version.points}</p>
          </div>
          {version && song && !showingAddRating &&
            <>
          <div className="action-button-wrapper" onClick={() => handleAddRatingClick()}>
          <button className="primary-button action-button"
          >rate this {song.song}</button>
        </div>
            </>
          }
        </>
        }
        {showingAddRating &&
          <AddRating artist={artist} song={song} version={version} user={user} username={username} addOnePoint={addOnePoint}
          addTenPoints={addTenPoints} canWrite={canWrite} calcAverageForVersion={calcAverageForVersion} fetchVersions={fetchVersions}
          fetchRatings={fetchRatings} addRatingCountToSong={addRatingCountToSong} addRatingCountToArtist={addRatingCountToArtist}
          setShowingAddRating={setShowingAddRating} setRatingAdded={setRatingAdded}
          />}
        {ratingAdded &&
        <p className="title">Added your rating.<br></br>Thank you for contributing!</p>}
          {version && version.listen_link &&
           <>
             <div className="listen-link">
               <br></br>
               <a className="listen-link link" href={version.listen_link}>listen here</a><br></br><br></br>
             </div>
           </>
          }
          {version && !version.listen_link && !showAddLink && !linkAdded && !showingAddRating &&
          <>
          <br></br>
          <div className="center-content">
          <button className="small-button"
          onClick={e => setShowAddLink(true)}>add a 'listen here' link</button>
          </div>
          </>}
          {version && showAddLink && !user &&
          <h3>please sign in to contribute</h3>}
          {version && showAddLink && user &&
          <>
          <br></br><br></br>
          <div className="center-content">
            <p className="center-text">add audio link here:</p>
            </div>
          <div className="center-content">
            <input
              className="inputField search-bar audio-input"
              type="link"
              placeholder="youtube, archive.org, etc."
              value={linkToAdd}
              onChange={(e) => {
            setLinkToAdd(e.target.value);
            }}/>
          </div>
          <div className="center-content">
            <button className="small-button" disabled={buttonDisabled}
            onClick={e => insertAddLink()}>add this link</button>
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