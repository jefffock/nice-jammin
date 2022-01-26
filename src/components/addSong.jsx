import { useState, useEffect, useRef } from 'react'
import { supabase } from './../supabaseClient'

function AddSong(props) {
  const [song, setSong] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showAlreadyExistsMessage, setShowAlreadyExistsMessage] = useState(false)
  const [cover, setCover] = useState(false)


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
      .insert([
        { song: song, artist: artist }
      ])
    if (error) {
      alert(error)
    } else {
      console.log('data')
      setShowSuccessMessage(true)
    }
  }

  return (
    <div>
      <h1>Add Song</h1>
      <div>
      <label htmlFor="artist">Artist: </label>
          <input
            className="inputField"
            type="artist"
            placeholder="Artist"
            value={props.artist}
          />
          <br></br>
          <br></br>
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
      <button
      onClick={e => testSong(props.artist, song)}
      disabled={loading}>Add this song</button>
      {showSuccessMessage &&
      <p>Successfully added {song}. Thank you for contributing! To see it in the songs list, refresh the page</p>}
      {showAlreadyExistsMessage &&
      <p>{song} by {props.artist} has already been added.</p>}
      <br></br>
      <br></br>
      <button className="small-button"
        onClick={e => props.setShowAddSong(false)}>Cancel</button>
    </div>
  )
}

export default AddSong