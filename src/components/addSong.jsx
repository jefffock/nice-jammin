import { useState, useEffect, useRef } from 'react'
import { supabase } from './../supabaseClient'

function AddSong(props) {
  const [song, setSong] = useState(props.nameToAdd || '')
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showAlreadyExistsMessage, setShowAlreadyExistsMessage] = useState(false)
  const [cover, setCover] = useState(false)

  useEffect(() => {
    console.log('user', props.user)
  }, [props.user])

  async function testSong(artist, song) {
    setLoading(true)
    setShowSuccessMessage(false)
    console.log('in add song', artist, song)
    const { data, error } = await supabase
      .from('songs')
      .select('song, artist')
      .eq('song', song)
      .eq('artist', artist)
    if (error) {
      alert(error)
    } else if (data.length === 0) {
      console.log('song doesn\'t exist yet')
      addSong(artist, song)
    } else {
      setShowAlreadyExistsMessage(true)
    }
    setLoading(false)
  }

  async function addSong(artist, song) {
    setLoading(true)
    const { data, error } = await supabase
      .from('songs')
      .insert(
        { song: song, artist: artist, cover: cover, user_id: props.user.id }, {returning: 'minimal'})
    if (error) {
      alert(error)
    } else {
      console.log('data', data)
      setShowSuccessMessage(true)
    }
  }

  function handleBackClick() {
    props.setShowAddSong(false)
    props.fetchSongs(props.artist)
  }

  return (
    <div>
      <h3>Add Song</h3>
      <div>
          <label htmlFor="song">Song: </label>
          <input
          className="inputField"
          type="song"
          placeholder=""
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
            setShowSuccessMessage(false);
            setShowAlreadyExistsMessage(false)}
          }/>
          <p>Please check for typos &#x263A;</p>
          <label htmlFor="cover">This is a cover: </label>
          <input type="checkbox" id="cover"
          onChange={e => setCover(e.target.checked)}></input>
      </div>
      <br></br>
      <button className="primary-button"
      onClick={e => testSong(props.artist, song)}
      disabled={loading}>Add this song</button>
      {showSuccessMessage &&
      <p>Successfully added {song}. Thank you for contributing! To see it in the songs list, refresh the page</p>}
      {showAlreadyExistsMessage &&
      <p>{song} by {props.artist} has already been added.</p>}
      <br></br>
      <br></br>
      <button className="small-button"
        onClick={e => handleBackClick()}>Back</button>
    </div>
  )
}

export default AddSong