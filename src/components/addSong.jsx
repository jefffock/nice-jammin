import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'
import FilterChip from './FilterChip'
import { Link } from 'react-router-dom'

function AddSong({ artist, user, fetchSongs, nameToAdd, username, addTenPoints, canWrite}) {
  const [song, setSong] = useState(nameToAdd || '')
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showAlreadyExistsMessage, setShowAlreadyExistsMessage] = useState(false)
  const [original, setOriginal] = useState(true)
  const [cover, setCover] = useState(false)



  useEffect(() => {
    if (cover || !original) {
      setCover(true)
      setOriginal(false)
    } else {
      setCover(false)
      setOriginal(true)
    }
  }, [cover, original])

  async function testSong(artistname, song) {
    setLoading(true)
    setShowSuccessMessage(false)
    const { data, error } = await supabase
      .from('songs')
      .select('song, artist')
      .eq('song', song)
      .eq('artist', artistname)
    if (error) {
      console.log(error)
    } else if (data.length === 0) {
      if (canWrite) {
        addSong(artistname, song)
      }
    } else {
      setShowAlreadyExistsMessage(true)
    }
    setLoading(false)
  }

  async function addSong(artistname, song) {
    setLoading(true)
    const { error } = await supabase
      .from('songs')
      .insert(
        { song: song, artist: artistname, cover: cover, submitter_name: username }, {returning: 'minimal'})
    if (error) {
      console.log(error)
    } else {
      setShowSuccessMessage(true)
      addTenPoints(username)
      fetchSongs(artistname)
    }
  }

  function handleCoverClick() {
    setCover(true)
    setOriginal(false)
  }

  function handleOriginalClick() {
    setOriginal(true)
    setCover(false)
  }

  return (
    <div className="add-song-container">
      <div className="add-song-wrapper">
      {!user &&
      <h3>Please sign in to contribute</h3>}
        {artist && user &&
        <>
      <h3>Add a song by {artist.artist}</h3>
      <div>
          {/* <label htmlFor="song">Song: </label> */}
          <input
          className="inputField search-bar"
          type="song"
          placeholder="Song name..."
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
            setShowSuccessMessage(false);
            setShowAlreadyExistsMessage(false)}
          }/>
          <br></br>
          <br></br>
          <p>Please check for typos &#x263A;</p>
          <br></br>
          <FilterChip currentFilterState={original} text='Original' setFilter={handleOriginalClick}/>
          <FilterChip currentFilterState={cover} text='Cover' setFilter={handleCoverClick}/>
      </div>
      <button className="primary-button"
      onClick={e => testSong(artist.artist, song)}
      disabled={loading}>Add this song</button>
      <br></br>
        </>}
      {showSuccessMessage &&
      <>
      <br></br>
      <br></br>
      <p>Successfully added {song}.</p>
      <br></br>
      <p>Thank you for contributing!</p>
      <br></br>
      </>}
      {showAlreadyExistsMessage &&
      <>
      <br></br>
      <br></br>
      <p>{song} by {artist.artist} has already been added.</p>
      </>
      }
      <br></br>
      {artist &&
      <Link to ={`/artists/${artist.id}`} style={{textDecoration: 'none'}}>
        <button className="small-button">Back to songs</button>
      </Link>
      }
      </div>
    </div>
  )
}

export default AddSong