import { useState, useEffect, useRef } from 'react'

function AddSong(props) {
  const [artist, Artist] = useState(props.artist)
  const [song, setSong] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  function addSong(artist, song) {
    setLoading(true)
    setShowSuccessMessage(false)
    console.log('in add song', artist, song)
    //if song exists
      //alert: song exists
    //else
      //insert into db
      //add points to user profile
    setShowSuccessMessage(true)
    setLoading(false)
  }

  return (
    <div>
      <h1>Add Song</h1>
      {showSuccessMessage &&
      <p>Successfully added {song}. Thank you for contributing!</p>}
      <div>
      <label htmlFor="artist">Artist: </label>
          <input
            className="inputField"
            type="artist"
            placeholder="Artist"
            value={artist}
          />
          <br></br>
          <br></br>
          <label htmlFor="song">Song Name: </label>
          <input
          className="inputField"
          type="song"
          placeholder=""
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
            setShowSuccessMessage(false)}
          }/>
          <p>Please check for typos &#x263A;</p>
      </div>
      <button
      onClick={e => addSong(artist, song)}
      disabled={loading}>Add this song</button>
      <br></br>
      <br></br>
      <button className="small-button"
        onClick={e => props.setShowAddSong(false)}>Cancel</button>
    </div>
  )
}

export default AddSong