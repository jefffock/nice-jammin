import { useState, useEffect, useRef } from 'react'
import { supabase } from './../supabaseClient'
import FilterChip from './FilterChip'

function AddVersion (props) {
  const [song, setSong] = useState(props.song)
  const [songExists, setSongExists] = useState(true)
  const [songName, setSongName] = useState(props.songName)
  const [filteredSongs, setFilteredSongs] = useState('')
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
  const [soulful, setSoulful] = useState(false)
  const [officialRelease, setOfficialRelease] = useState(false)
  const [sloppy, setSloppy] = useState(false)

  useEffect(() => {
    console.log('props in addVersions', props)
    setSongId(props.songData.id)
  }, [props])

  useEffect(() => {
    console.log('funky', funky)
  }, [funky])

  useEffect(() => {
    console.log('date', date)
  }, [date])


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
    const { error } = await supabase
      .from('versions')
      .insert(
        [{ song_id: songId,
          version_user_id: props.user.id,
          song_user_id: props.songData.user_id,
          num_ratings: 0,
          sum_ratings: 0,
          avg_rating: 0,
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
          acoustic: acoustic,
          soulful: soulful,
          official_release: officialRelease,
          sloppy: sloppy
        }])
    if (error) {
      console.log('error', error)
    } else {
      setShowSuccessMessage(true)
    }
  }

  function filterSongs(searchTerm) {
    console.log('searchTerm', searchTerm)
    setSongName(searchTerm)
    if (searchTerm === '') {
      setFilteredSongs([])
    } else {
      let newFilteredSongs = []
      let myRegex = new RegExp(searchTerm, "ig")
      for (var i = 0; i < props.songs.length; i++) {
        if (myRegex.test(props.songs[i].song)) {
          newFilteredSongs.push(props.songs[i])
        }
      }
      setFilteredSongs(newFilteredSongs)
      if (newFilteredSongs.length === 1 && searchTerm === newFilteredSongs[0].song) {
        setSongExists(true)
      } else {
        setSongExists(false)
      }
    }
  }

  function handleSongChange(song) {
    setSong(song)
    setSongId(song.id)
    setSongExists(true)
    setSongName(song.song)
    setFilteredSongs([])
    setSongExists(true)
  }



  function handleBackClick() {
    props.setShowAddVersion(false)
  }

  return (
    <>
    <div>
      <h3>Add Version</h3>
      <div>
      <label htmlFor="song">Song: </label>
      <input
        className="inputField"
        type="song"
        placeholder=""
        value={songName}
        onChange={(e) => {
          filterSongs(e.target.value)
          setShowSuccessMessage(false);
          setShowAlreadyExistsMessage(false);}
        }/>
        {filteredSongs.length > 0 &&
        <>
        <br></br>
        <br></br>
        </>
        }
        {filteredSongs.length > 0 &&
        filteredSongs.map(song => {
          return (
            <button className="button-in-list song-select"
            onClick={() => handleSongChange(song)}>{song.song}</button>
          )
        })}
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
        {songExists && (date !== '') &&
        <>
        <br></br>
        <br></br>
        <p>Please make sure {props.artist} played {songName} on {date} &#x263A;</p>
        <br></br>
        </>}
        {!songExists && (songName !== '') &&
        <>
        <br></br>
        <br></br>
        <p>If "{songName}" is a song played by {props.artist}, please add it!</p>
        <br></br>
        <button className="small-button"
        onClick={e => props.handleShowAddSong(songName)}>Go to 'Add A Song'</button>
        </>
        }
        {songExists && (date !== '') &&
        <>
        <p>Please select all that apply to this version:</p>
        <br></br>
        <div className="tags">
          <FilterChip currentFilterState={acoustic} text='Acoustic' setFilter={setAcoustic}/>
          <FilterChip currentFilterState={ambient} text='Ambient/Space' setFilter={setAmbient}/>
          <FilterChip currentFilterState={bliss} text='Bliss' setFilter={setBliss}/>
          <FilterChip currentFilterState={crunchy} text='Crunchy' setFilter={setCrunchy}/>
          <FilterChip currentFilterState={dark} text='Dark' setFilter={setDark}/>
          <FilterChip currentFilterState={fast} text='Fast' setFilter={setFast}/>
          <FilterChip currentFilterState={funky} text='Funky' setFilter={setFunky}/>
          <FilterChip currentFilterState={groovy} text='Groovy' setFilter={setGroovy}/>
          <FilterChip currentFilterState={guest} text='Guest' setFilter={setGuest}/>
          <FilterChip currentFilterState={happy} text='Happy' setFilter={setHappy}/>
          <FilterChip currentFilterState={heavy} text='Heavy' setFilter={setHeavy}/>
          <FilterChip currentFilterState={jazzy} text='Jazzy' setFilter={setJazzy}/>
          <FilterChip currentFilterState={officialRelease} text='Official Release' setFilter={setOfficialRelease}/>
          <FilterChip currentFilterState={peaks} text='Peaks' setFilter={setPeaks}/>
          <FilterChip currentFilterState={reggae} text='Reggae' setFilter={setReggae}/>
          <FilterChip currentFilterState={shred} text='Shred' setFilter={setShred}/>
          <FilterChip currentFilterState={silly} text='Silly' setFilter={setSilly}/>
          <FilterChip currentFilterState={slow} text='Slow' setFilter={setSlow}/>
          <FilterChip currentFilterState={soaring} text='Soaring' setFilter={setSoaring}/>
          <FilterChip currentFilterState={soulful} text='Soulful' setFilter={setSoulful}/>
          <FilterChip currentFilterState={sloppy} text='Sloppy' setFilter={setSloppy}/>
          <FilterChip currentFilterState={trippy} text='Trippy' setFilter={setTrippy}/>
          <FilterChip currentFilterState={type2} text='Type II' setFilter={setType2}/>
          </div>
          <br></br>
        </>}
      {songExists && date &&
      <button className="primary-button"
      onClick={e => testVersion(date)}
      disabled={loading}>Add this version</button>}
      {showSuccessMessage &&
      <p>Added the {date} version of {songName}. Thank you for contributing!</p>}
      {showAlreadyExistsMessage &&
      <>
      <p>You have good taste: the {date} version of {songName} has already been added.</p>
      <br></br>
      <br></br>
      </>}
      <br></br>
      <br></br>
      <button className="small-button"
        onClick={e => handleBackClick()}>Back</button>
      </div>
      </div>
    </>
  )
}

export default AddVersion