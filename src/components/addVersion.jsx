import { useState, useEffect, useRef } from 'react'
import { supabase } from './../supabaseClient'

function AddVersion(props) {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [songId, setSongId] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showAlreadyExistsMessage, setShowAlreadyExistsMessage] = useState(false)
  const [funky, setFunky] = useState(false)
  const [ambient, setAmbient] = useState(false)
  const [fast, setFast] = useState(false)
  const [slow, setSlow] = useState(false)
  const [bliss, setBliss] = useState(false)
  const [shred, setShred] = useState(false)
  const [dark, setDark] = useState(false)
  const [silly, setSilly] = useState(false)
  const [guest, setGuest] = useState(false)
  const [type2, setType2] = useState(false)
  const [groovy, setGroovy] = useState(false)
  const [peaks, setPeaks] = useState(false)
  const [reggae, setReggae] = useState(false)
  const [heavy, setHeavy] = useState(false)
  const [jazzy, setJazzy] = useState(false)
  const [trippy, setTrippy] = useState(false)
  const [soaring, setSoaring] = useState(false)
  const [crunchy, setCrunchy] = useState(false)
  const [happy, setHappy] = useState(false)
  const [acoustic, setAcoustic] = useState(false)

  useEffect(() => {
    async function getSongId() {
      console.log('ingetSongId')
      const { data, error } = await supabase
        .from('songs')
        .select('id')
        .eq('song', props.song)
        .eq('artist', props.artist)
      if (error) {
        console.log('error', error)
      } else {
        console.log('songId', data[0].id)
        setSongId(data[0].id)
      }
    } getSongId()
  }, [props.song, props.artist])


  async function testVersion(date) {
    if (date === '') {
      alert('Please enter a date')
    } else {
      setLoading(true)
      setShowSuccessMessage(false)
      const { data, error } = await supabase
        .from('versions')
        .select('id')
        .eq('song_id', songId)
        .eq('date', date)
      if (error) {
        console.log('error', error)
        alert('error:', error)
      } else if (data.length === 0) {
        console.log('song doesn\'t exist yet')
        insertVersion(date)
      } else {
        console.log('version already exists')
        setShowAlreadyExistsMessage(true)
      }
      setLoading(false)
    }
  }

  async function insertVersion(date) {
    console.log('in insert version', date)
    setLoading(true)
    const { data, error } = await supabase
      .from('versions')
      .insert([
        { song_id: songId,
          date: date,
          funky: funky,
          ambient: ambient,
          fast: fast,
          slow: slow,
          bliss: bliss,
          shred: shred,
          dark: dark,
          silly: silly,
          guest: guest,
          type2: type2,
          groovy: groovy,
          peaks: peaks,
          reggae: reggae,
          heavy: heavy,
          jazzy: jazzy,
          trippy: trippy,
          soaring: soaring,
          crunchy: crunchy,
          happy: happy,
          acoustic: acoustic
        }
      ])
    if (error) {
      alert(error)
    } else {
      console.log('data')
      setShowSuccessMessage(true)
    }
  }

  function handleChange(e) {
    console.log('checked', e.target.checked)
  }

  return (
    <>
    <div>
      <h1>Add Version</h1>
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
        <label htmlFor="song">Name: </label>
        <input
          className="inputField"
          type="song"
          placeholder="Song"
          value={props.song}
        />
        <br></br>
        <br></br>
        <label htmlFor="version">Date: </label>
        <input
        className="inputField"
        type="date"
        placeholder=""
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setShowSuccessMessage(false);
          setShowAlreadyExistsMessage(false)}
        }/>
        <p>Please make sure {props.artist} played {props.song} on that date &#x263A;</p>
        <p>Please check all that apply:</p>
        <div className="checkboxes-container">
          <div className="col1 row1">
            <label htmlFor="funky">Funky</label>
            <input type="checkbox" id="funky"
            onChange={e => setFunky(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row2">
            <label htmlFor="fast">Fast</label>
            <input type="checkbox" id="fast"
            onChange={e => setFast(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row4">
            <label htmlFor="slow">Slow</label>
            <input type="checkbox" id="slow"
            onChange={e => setSlow(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row4">
            <label htmlFor="bliss">Bliss</label>
            <input type="checkbox" id="bliss"
            onChange={e => setBliss(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row1">
            <label htmlFor="dark">Dark</label>
            <input type="checkbox" id="dark"
            onChange={e => setDark(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row2">
            <label htmlFor="shred">Shred</label>
            <input type="checkbox" id="shred"
            onChange={e => setShred(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row3">
            <label htmlFor="ambient">Ambient/Space</label>
            <input type="checkbox" id="ambient"
            onChange={e => setAmbient(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row6">
            <label htmlFor="silly">Silly</label>
            <input type="checkbox" id="silly"
            onChange={e => setSilly(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row10">
            <label htmlFor="guest">Guest</label>
            <input type="checkbox" id='guest'
            onChange={e => setGuest(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row5">
            <label htmlFor="type2">Type II</label>
            <input type="checkbox" id='type2'
            onChange={e => setType2(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row7">
            <label htmlFor="groovy">Groovy</label>
            <input type="checkbox" id="groovy"
            onChange={e => setGroovy(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row8">
            <label htmlFor="peaks">Peaks</label>
            <input type="checkbox" id="peaks"
            onChange={e => setPeaks(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row6">
            <label htmlFor="reggae">Reggae</label>
            <input type="checkbox" id="reggae"
            onChange={e => setReggae(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row7">
            <label htmlFor="heavy">Heavy</label>
            <input type="checkbox" id="hjazzyeavy"
            onChange={e => setHeavy(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row9">
            <label htmlFor="jazzy">Jazzy</label>
            <input type="checkbox" id="jazzy"
            onChange={e => setJazzy(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row8">
            <label htmlFor="trippy">Trippy</label>
            <input type="checkbox" id="trippy"
            onChange={e => setTrippy(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row3">
            <label htmlFor="soaring">Soaring</label>
            <input type="checkbox" id="soaring"
            onChange={e => setSoaring(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col2 row9">
            <label htmlFor="crunchy">Crunchy</label>
            <input type="checkbox" id="crunchy"
            onChange={e => setCrunchy(e.target.checked)}></input>
            <br></br>
            <br></br>
          </div>
          <div className="col1 row5">
            <label htmlFor="happy">Happy</label>
            <input type="checkbox" id="happy"
            onChange={e => setHappy(e.target.checked)}></input>
          </div>
          <div className="col2 row10">
              <label htmlFor="acoustic">Acoustic</label>
              <input type="checkbox" id="acoustic"
              onChange={e => setAcoustic(e.target.checked)}></input>
            </div>
          </div>
        </div>
        <br></br>
      <button
      onClick={e => testVersion(date)}
      disabled={loading}>Add this version</button>
      {showSuccessMessage &&
      <p>Successfully added the {date} version of {props.song}. Thank you for contributing! To see it in the songs list, refresh the page</p>}
      {showAlreadyExistsMessage &&
      <p>The {date} version of {props.song} has already been added.</p>}
      <br></br>
      <br></br>
      <button className="small-button"
        onClick={e => props.setShowAddVersion(false)}>Cancel</button>
    </div>
    </>
  )
}

export default AddVersion