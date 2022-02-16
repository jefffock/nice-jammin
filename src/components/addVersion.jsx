import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'
import FilterChip from './FilterChip'
import { Link, useParams, useNavigate } from 'react-router-dom'

function AddVersion ({ artists, artist, song, songs, user, username, addOnePoint, addTenPoints,
  canWrite, setArtist, setSong, fetchVersions}) {
  const [songExists, setSongExists] = useState(true)
  const [songName, setSongName] = useState(() => getInitialSongName())
  const [filteredSongs, setFilteredSongs] = useState(null)
  const [date, setDate] = useState('')
  const [year, setYear] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showAlreadyExistsMessage, setShowAlreadyExistsMessage] = useState(false)
  const [location, setLocation] = useState('')
  const [listenLink, setListenLink] = useState('')
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
  const [tease, setTease] = useState(false)
  const [multiPart, setMultiPart] = useState(false)
  const [sludgy, setSludgy] = useState(false)
  const [synthy, setSynthy] = useState(false)
  const [chaotic, setChaotic] = useState(false)
  const [dissonant, setDissonant] = useState(false)
  const [bluesy, setBluesy] = useState(false)
  const [stopStart, setStopStart] = useState(false)
  const [segue, setSegue] = useState(false)
  const [unusual, setUnusual] = useState(false)
  const [long, setLong] = useState(false)
  const [thatYearsStyle, setThatYearsStyle] = useState(false)

  let { artistId, songId } = useParams()
  let navigate = useNavigate();


  useEffect(() => {
    if (artists) {
      let correctArtist = (artist) => JSON.stringify(artist.id) === artistId
      let index = artists.findIndex(correctArtist)
      setArtist(artists[index])
    }
  }, [artistId, artist, setArtist])

  useEffect(() => {
    if (songs) {
      let correctSong = (song) => JSON.stringify(song.id) === songId
      let index = songs.findIndex(correctSong)
      setSong(songs[index])
    }
  }, [songs, songId, setSong])

  useEffect(() => {
    if (song) {
      setSongName(song.song)
      if (songId !== JSON.stringify(song.id)) {
        navigate(`../../songs/${song.id}/add-version`)
      }
   }
  }, [song, songId, navigate])

  useEffect(() => {
    let yearString = date.slice(0,4)
    setYear(parseInt(yearString))
  }, [date])

  function getInitialSongName() {
    if (song) {
      return song.song
    } else {
      return ''
    }
  }


  async function testVersion(date) {
    let locationValid = true
    let dateValid = true
    let currentDate = new Date()
    if (currentDate < Date.parse(date)) {
      dateValid = false
      alert(`Hello, time traveller! Thanks for trying to add this version of ${song.song}.\n\nUnfortunately, that would create a few paradoxes.\n\nIf the jam is great again in this timeline, feel free to come back and add it. Thank you, and safe travels!`)
    }
    if (!canWrite) {
      locationValid = false;
      dateValid = false;
    }
    if ((artist.start_year && year < artist.start_year) ||
    (artist.end_year && year > artist.end_year)) {
        dateValid = false
        alert(`I don't think ${artist.artist} played in ${year}. Imagine if they did, though!`)
    }
    if (location === '') {
      alert('Please enter a location')
      locationValid = false
    } if (location.length > 20) {
      locationValid = false
      alert('Please make the location shorter (20 characters max.)')
    }
    if (date === '') {
      dateValid = false
      alert('Please enter a date')
    } if (dateValid && locationValid) {
      setLoading(true)
      setShowSuccessMessage(false)
      let songid = parseInt(song.id)
      const { data, error } = await supabase
        .from('versions')
        .select('id')
        .eq('song_id', songid)
        .eq('date', date)
      if (error) {
        console.log('error', error)
      } else if (data.length === 0) {
        insertVersion(date)
      } else {
        setShowAlreadyExistsMessage(true)
      }
      setLoading(false)
    }
  }

  async function insertVersion(date) {
    setLoading(true)
    const { error } = await supabase
      .from('versions')
      .insert(
        [{ song_id: songId,
          user_id: user.id,
          submitter_name: username,
          location: location,
          artist: artist.artist,
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
          sloppy: sloppy,
          tease: tease,
          listen_link: listenLink,
          multi_part: multiPart,
          sludgy: sludgy,
          synthy: synthy,
          chaotic: chaotic,
          dissonant: dissonant,
          bluesy: bluesy,
          stop_start: stopStart,
          segue: segue,
          unusual: unusual,
          long: long,
          that_years_style: thatYearsStyle
        }])
    if (error) {
    } else {
      setShowSuccessMessage(true)
      addOnePoint(song.submitter_name)
      addTenPoints(username)
      fetchVersions(song.id)
      }
  }

  function filterSongs(searchTerm) {
    setSongName(searchTerm)
    if (searchTerm === '') {
      setFilteredSongs([])
    } else {
      let newFilteredSongs = []
      let myRegex = new RegExp(searchTerm, "ig")
      for (var i = 0; i < songs.length; i++) {
        if (myRegex.test(songs[i].song)) {
          newFilteredSongs.push(songs[i])
        }
      }
      setFilteredSongs(newFilteredSongs)
      if ((newFilteredSongs.length === 1 ) && (searchTerm === newFilteredSongs[0].song)) {
        setSongExists(true)
      } else {
        setSongExists(false)
      }
    }
  }

  function handleSongClick(song) {
    setSongName(song.song)
    setFilteredSongs([])
    setSongExists(true)
    setSong(song)
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    setShowSuccessMessage(false);
    setShowAlreadyExistsMessage(false)
  }



  function handleBackClick() {
    fetchVersions(song.id)
    navigate('../')
  }

  return (
    <>
    <div className="add-version-container">
      <div className="add-version-wrapper">
        {!user &&
        <h3>Please sign in to contribute</h3>}
        {user &&
        <>
      <h3>Add Version</h3>
      <div className="add-version-inputs">
      <label htmlFor="song">Song: </label><br></br>
      <input
        className="inputField search-bar bar"
        type="song"
        placeholder=""
        value={songName}
        onChange={(e) => {
          filterSongs(e.target.value)
          setShowSuccessMessage(false);
          setShowAlreadyExistsMessage(false);}
        }/>
        {/* {filteredSongs && filteredSongs.length > 0 &&
        <>
        <br></br>
        <br></br>
        </>
        } */}
        {filteredSongs && filteredSongs.length > 0 && songName !== song.song &&
        filteredSongs.map(song => {
          return (
            <div className="item-in-list-large" onClick={() => handleSongClick(song)}>
              <span>{song.song}</span>
            </div>
          )
        })}
        {songExists &&
        <>
        <br></br>
        <br></br>
        <label htmlFor="version">Date: </label><br></br>
        <input
        className="inputField search-bar bar"
        type="date"
        placeholder=""
        value={date}
        onChange={(e) => handleDateChange(e)}/>
        </>
        }
        {songExists && date.length > 9 && (date.charAt(0) === '1' || date.charAt(0) === '2') &&
        <>
          <br></br>
          <br></br>
          <label htmlFor="location">Location: </label><br></br>
          <input
          className="inputField search-bar bar"
          type="text"
          placeholder="City or Venue"
          value={location}
          onChange={(e) => setLocation(e.target.value)}/><br></br><br></br>
          <label htmlFor="listen">Link to listen (optional): </label><br></br>
          <input
          className="inputField search-bar bar"
          type="text"
          placeholder="YouTube, Archive.org, etc..."
          value={listenLink}
          onChange={(e) => setListenLink(e.target.value)}/>
        </>}
        </div>
        <br></br>
        <br></br>
        {!songExists && (songName !== '') &&
        <>
        <br></br>
        <br></br>
        <p>If "{songName}" is a song played by {artist.artist}, please add it!</p>
        <br></br>
        <Link to="../../add-song" >Go to 'Add A Song'</Link>
        </>
        }
        {songExists && date.length > 9 && (date.charAt(0) === '1' || date.charAt(0) === '2') &&
        <>
        <p>Please select the tags that you feel apply to this version:</p>
        <br></br>
        <div className="tags">
          <FilterChip currentFilterState={acoustic} text='Acoustic' setFilter={setAcoustic}/>
          <FilterChip currentFilterState={ambient} text='Ambient/Space' setFilter={setAmbient}/>
          <FilterChip currentFilterState={bliss} text='Bliss' setFilter={setBliss}/>
          <FilterChip currentFilterState={bluesy} text='Bluesy' setFilter={setBluesy}/>
          <FilterChip currentFilterState={chaotic} text='Chaotic' setFilter={setChaotic}/>
          <FilterChip currentFilterState={crunchy} text='Crunchy' setFilter={setCrunchy}/>
          <FilterChip currentFilterState={dark} text='Dark' setFilter={setDark}/>
          <FilterChip currentFilterState={dissonant} text='Dissonant' setFilter={setDissonant}/>
          <FilterChip currentFilterState={fast} text='Fast' setFilter={setFast}/>
          <FilterChip currentFilterState={funky} text='Funky' setFilter={setFunky}/>
          <FilterChip currentFilterState={groovy} text='Groovy' setFilter={setGroovy}/>
          <FilterChip currentFilterState={guest} text='Guest' setFilter={setGuest}/>
          <FilterChip currentFilterState={happy} text='Happy' setFilter={setHappy}/>
          <FilterChip currentFilterState={heavy} text='Heavy' setFilter={setHeavy}/>
          <FilterChip currentFilterState={jazzy} text='Jazzy' setFilter={setJazzy}/>
          <FilterChip currentFilterState={long} text='Long' setFilter={setLong}/>
          <FilterChip currentFilterState={multiPart} text='Multi-part' setFilter={setMultiPart}/>
          <FilterChip currentFilterState={officialRelease} text='Official Release' setFilter={setOfficialRelease}/>
          <FilterChip currentFilterState={peaks} text='Peaks' setFilter={setPeaks}/>
          <FilterChip currentFilterState={reggae} text='Reggae' setFilter={setReggae}/>
          <FilterChip currentFilterState={segue} text='Segue' setFilter={setSegue}/>
          <FilterChip currentFilterState={shred} text='Shred' setFilter={setShred}/>
          <FilterChip currentFilterState={silly} text='Silly' setFilter={setSilly}/>
          <FilterChip currentFilterState={sloppy} text='Sloppy' setFilter={setSloppy}/>
          <FilterChip currentFilterState={slow} text='Slow' setFilter={setSlow}/>
          <FilterChip currentFilterState={sludgy} text='Sludgy' setFilter={setSludgy}/>
          <FilterChip currentFilterState={soaring} text='Soaring' setFilter={setSoaring}/>
          <FilterChip currentFilterState={soulful} text='Soulful' setFilter={setSoulful}/>
          <FilterChip currentFilterState={stopStart} text='Stop-start' setFilter={setStopStart}/>
          <FilterChip currentFilterState={synthy} text='Synthy' setFilter={setSynthy}/>
          <FilterChip currentFilterState={tease} text='Teases' setFilter={setTease}/>
          <FilterChip currentFilterState={thatYearsStyle} text="That Year's Style" setFilter={setThatYearsStyle}/>
          <FilterChip currentFilterState={trippy} text='Trippy' setFilter={setTrippy}/>
          <FilterChip currentFilterState={type2} text='Type II' setFilter={setType2}/>
          <FilterChip currentFilterState={unusual} text='Unusual' setFilter={setUnusual}/>
          </div>
          <br></br>
        </>}
      {songExists && date.length > 9 && (date.charAt(0) === '1' || date.charAt(0) === '2') &&
      <button className="primary-button"
      onClick={e => testVersion(date)}
      disabled={loading}>Add this version</button>}
      {showSuccessMessage &&
      <>
      <br></br><br></br><p>Added the {date} version of {songName}. Thank you for contributing!</p>
      </>
      }
      {showAlreadyExistsMessage &&
      <>
      <p>You have good taste: the {date} version of {songName} has already been added.</p>
      <br></br>
      <br></br>
      </>}
      <br></br>
      <br></br>
        </>}
      <button className="small-button"
        onClick={e => handleBackClick()}>Back</button>
      </div>
      </div>
    </>
  )
}

export default AddVersion