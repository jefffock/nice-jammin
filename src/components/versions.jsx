import { useState, useEffect } from 'react'
import Version from './version'
import FilterChip from './FilterChip'
import { Link, useParams, Outlet } from 'react-router-dom'

function Versions({ artists, artist, songs, song, versions, version, fetchArtists, fetchSongs, fetchVersions,
  setArtist, setSong, setVersion, addPointsToVersion }) {
  const [filteredVersions, setFilteredVersions] = useState(versions)
  const [filters, setFilters] = useState([])
  const [showFilters, setShowFilters] = useState(false)
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
  const [filterText, setFilterText] = useState('show filters')
  const [fillRating, setFillRating] = useState(true)
  const [fillNewest, setFillNewest] = useState(false)
  const [fillOldest, setFillOldest] = useState(false)
  const [fillLocation, setFillLocation] = useState(false)
  const [afterDate, setAfterDate] = useState('')
  const [beforeDate, setBeforeDate] = useState('')
  const [showingAddVersion, setShowingAddVersion] = useState(false)
  let { artistId, songId, versionId } = useParams()
  let params = useParams()

useEffect(() => {
  let split = params['*'].split('/')
    if (split[2] === 'add-version') {
      setShowingAddVersion(true)
    } else {
      setShowingAddVersion(false)
    }
  }, [params]
)

  useEffect(() => {
    if (artists) {
      let correctArtist = (artist) => JSON.stringify(artist.id) === artistId
      let index = artists.findIndex(correctArtist)
      setArtist(artists[index])
    }
  }, [artists, setArtist, artistId])

  useEffect(() => {
    if (songs && songId) {
      let correctSong = (song) => JSON.stringify(song.id) === songId
      let index = songs.findIndex(correctSong)
      setSong(songs[index])
    }
  }, [songs, songId, setSong])

  useEffect(() => {
    let newFilters = []
    if (funky) {
      newFilters.push('funky')
    } if (funky) {
      newFilters.push('funky')
    } if (ambient) {
      newFilters.push('ambient')
    } if (fast) {
      newFilters.push('fast')
    } if (slow) {
      newFilters.push('slow')
    } if (bliss) {
      newFilters.push('bliss')
    } if (shred) {
      newFilters.push('shred')
    } if (dark) {
      newFilters.push('dark')
    } if (silly) {
      newFilters.push('silly')
    } if (guest) {
      newFilters.push('guest')
    } if (type2) {
      newFilters.push('type2')
    } if (groovy) {
      newFilters.push('groovy')
    } if (peaks) {
      newFilters.push('peaks')
    } if (reggae) {
      newFilters.push('reggae')
    } if (heavy) {
      newFilters.push('heavy')
    } if (jazzy) {
      newFilters.push('jazzy')
    } if (trippy) {
      newFilters.push('trippy')
    } if (soaring) {
      newFilters.push('soaring')
    } if (crunchy) {
      newFilters.push('crunchy')
    } if (happy) {
      newFilters.push('happy')
    } if (acoustic) {
      newFilters.push('acoustic')
    } if (soulful) {
      newFilters.push('soulful')
    } if (officialRelease) {
      newFilters.push('official_release')
    } if (sloppy) {
      newFilters.push('sloppy')
    } if (multiPart) {
      newFilters.push('multi_part')
    } if (sludgy) {
      newFilters.push('sludgy')
    } if (synthy) {
      newFilters.push('synthy')
    } if (chaotic) {
      newFilters.push('chaotic')
    } if (dissonant) {
      newFilters.push('dissonant')
    } if (bluesy) {
      newFilters.push('bluesy')
    } if (stopStart) {
      newFilters.push('stop_start')
    } if (segue) {
      newFilters.push('segue')
    } if (unusual) {
      newFilters.push('unusual')
    } if (long) {
      newFilters.push('long')
    } if (thatYearsStyle) {
      newFilters.push('that_years_style')
    } setFilters(newFilters)
  }, [funky, ambient, fast, slow, bliss, shred, dark, silly, guest, type2, groovy, peaks,reggae,
    heavy, jazzy, trippy, soaring, crunchy, happy, acoustic, soulful, officialRelease, sloppy,
    multiPart, sludgy, synthy, chaotic, dissonant, bluesy, stopStart, segue, unusual, long, thatYearsStyle])


  useEffect(() => {
    if (filters.length === 0 && !afterDate && !beforeDate) {
    setFilteredVersions(versions)
    } else {
      let afterTime, beforeTime
      if (afterDate) {
        afterTime = Date.parse(afterDate)
      } if (beforeDate) {
        beforeTime = Date.parse(beforeDate)
      }
        let newFilteredVersions = []
        for (var i = 0; i < versions.length; i++) {
          let passesFilters = true
          if (afterDate && (Date.parse(versions[i].date) < afterTime)) {
            passesFilters = false;
          } if (beforeDate && (Date.parse(versions[i].date) > beforeTime)) {
            passesFilters = false
          } if (passesFilters) {
            for (var j = 0; j < filters.length; j++) {
              let currentFilter = filters[j]
              if (!versions[i][currentFilter]) {
                passesFilters = false;
              }
            } if (passesFilters) {
              newFilteredVersions.push(versions[i])
          }
          }
        }
        setFilteredVersions(newFilteredVersions)
    }
  }, [filters, versions, afterDate, beforeDate])


  useEffect(() => {
    if (showFilters) {
      setFilterText('hide filters')
    } else {
      setFilterText('show filters')
    }
  }, [showFilters])

  function handleRatingClick() {
    setFillRating(true)
    setFillNewest(false)
    setFillOldest(false)
    setFillLocation(false)
    function compareRating(a, b) {
      return (b.avg_rating - a.avg_rating)
    }
    let sortedVersions = filteredVersions.sort(compareRating);
    setFilteredVersions(sortedVersions)
  }

  function handleNewestClick() {
    setFillNewest(true)
    setFillRating(false)
    setFillOldest(false)
    setFillLocation(false)
    function sortNewest(a, b) {
      if (a.date > b.date) {
        return -1
      } if (a.date < b.date) {
        return 1
      } return 0
    }
    let sortedVersions = filteredVersions.sort(sortNewest);
    setFilteredVersions(sortedVersions)
  }

  function handleOldestClick() {
    setFillNewest(false)
    setFillRating(false)
    setFillOldest(true)
    setFillLocation(false)
    function sortOldest(a, b) {
      if (a.date > b.date) {
        return 1
      } if (a.date < b.date) {
        return -1
      } return 0
    }
    let sortedVersions = filteredVersions.sort(sortOldest);
    setFilteredVersions(sortedVersions)
  }

  function handleLocationClick() {
    setFillNewest(false)
    setFillRating(false)
    setFillOldest(false)
    setFillLocation(true)
    function sortLocation(a, b) {
      if (a.location > b.location) {
        return 1
      } if (a.location < b.location) {
        return -1
      } return 0
    }
    let sortedVersions = filteredVersions.sort(sortLocation);
    setFilteredVersions(sortedVersions)
  }

  return (
    <>
    <Outlet />
    {!versionId && !showingAddVersion &&
    <div className="complete-versions-container">
      {(!versions || versions.length === 0) && !showingAddVersion &&
      <>
      <div className="loading">
        <p>loading...</p>
        <br></br>
        <p>...or, if you have time to read this, maybe no versions have been added yet!<br></br><br></br>if you know a great one, please add it!</p>
      </div>
      </>}
      {!showingAddVersion &&
      <div onClick={() => setShowingAddVersion(true)}><Link to="add-version" style={{ textDecoration: 'none' }}>
        <button className="primary-button">add a great version</button>
      </Link>
      <br></br>
      <br></br>
      </div>}
      {(versions && versions.length > 0) &&
      <button className="small-button show-filters-button"
      onClick={e => setShowFilters(!showFilters)}>{filterText}</button>}
      {showFilters &&
      <>
      <br></br>
          <FilterChip currentFilterState={acoustic} text='acoustic' setFilter={setAcoustic}/>
          <FilterChip currentFilterState={ambient} text='ambient/space' setFilter={setAmbient}/>
          <FilterChip currentFilterState={bliss} text='bliss' setFilter={setBliss}/>
          <FilterChip currentFilterState={bluesy} text='bluesy' setFilter={setBluesy}/>
          <FilterChip currentFilterState={chaotic} text='chaotic' setFilter={setChaotic}/>
          <FilterChip currentFilterState={crunchy} text='crunchy' setFilter={setCrunchy}/>
          <FilterChip currentFilterState={dark} text='dark' setFilter={setDark}/>
          <FilterChip currentFilterState={dissonant} text='dissonant' setFilter={setDissonant}/>
          <FilterChip currentFilterState={fast} text='fast' setFilter={setFast}/>
          <FilterChip currentFilterState={funky} text='funky' setFilter={setFunky}/>
          <FilterChip currentFilterState={groovy} text='groovy' setFilter={setGroovy}/>
          <FilterChip currentFilterState={guest} text='guest' setFilter={setGuest}/>
          <FilterChip currentFilterState={happy} text='happy' setFilter={setHappy}/>
          <FilterChip currentFilterState={heavy} text='heavy' setFilter={setHeavy}/>
          <FilterChip currentFilterState={jazzy} text='jazzy' setFilter={setJazzy}/>
          <FilterChip currentFilterState={long} text='long' setFilter={setLong}/>
          <FilterChip currentFilterState={multiPart} text='multi-part' setFilter={setMultiPart}/>
          <FilterChip currentFilterState={officialRelease} text='official release' setFilter={setOfficialRelease}/>
          <FilterChip currentFilterState={peaks} text='peaks' setFilter={setPeaks}/>
          <FilterChip currentFilterState={reggae} text='reggae' setFilter={setReggae}/>
          <FilterChip currentFilterState={segue} text='segue' setFilter={setSegue}/>
          <FilterChip currentFilterState={shred} text='shred' setFilter={setShred}/>
          <FilterChip currentFilterState={silly} text='silly' setFilter={setSilly}/>
          <FilterChip currentFilterState={sloppy} text='sloppy' setFilter={setSloppy}/>
          <FilterChip currentFilterState={slow} text='slow' setFilter={setSlow}/>
          <FilterChip currentFilterState={sludgy} text='sludgy' setFilter={setSludgy}/>
          <FilterChip currentFilterState={soaring} text='soaring' setFilter={setSoaring}/>
          <FilterChip currentFilterState={soulful} text='soulful' setFilter={setSoulful}/>
          <FilterChip currentFilterState={stopStart} text='stop-start' setFilter={setStopStart}/>
          <FilterChip currentFilterState={synthy} text='synthy' setFilter={setSynthy}/>
          <FilterChip currentFilterState={tease} text='teases' setFilter={setTease}/>
          <FilterChip currentFilterState={thatYearsStyle} text="that year's style" setFilter={setThatYearsStyle}/>
          <FilterChip currentFilterState={trippy} text='trippy' setFilter={setTrippy}/>
          <FilterChip currentFilterState={type2} text='type II' setFilter={setType2}/>
          <FilterChip currentFilterState={unusual} text='unusual' setFilter={setUnusual}/>
        <br></br><br></br>
        <label htmlFor="version">played after this date: </label><br></br>
        <input
        className="inputField search-bar bar"
        type="date"
        placeholder=""
        value={afterDate}
        onChange={(e) => {
          setAfterDate(e.target.value)}
        }/><br></br><br></br>
        <label htmlFor="version">played before this date: </label><br></br>
        <input
        className="inputField search-bar bar"
        type="date"
        placeholder=""
        value={beforeDate}
        onChange={(e) => {
          setBeforeDate(e.target.value)}
        }/><br></br><br></br>
        <button className="small-button" onClick={e => { setAfterDate(''); setBeforeDate('')}}>clear date filters</button>
      </>}
      {filteredVersions && filteredVersions.length > 0 &&
      <><br></br><br></br>
      <h3>sort by:</h3>
      <FilterChip currentFilterState={fillRating} text='rating' setFilter={handleRatingClick}/>
      <FilterChip currentFilterState={fillNewest} text='newest' setFilter={handleNewestClick}/>
      <FilterChip currentFilterState={fillOldest} text='oldest' setFilter={handleOldestClick}/>
      <FilterChip currentFilterState={fillLocation} text='location' setFilter={handleLocationClick}/>
      </>}
      {(filters && filters.length > 0) && filteredVersions.length === 0 &&
      <>
      <br></br><br></br>
        <p>sorry, no submitted versions match those filters. it'd be a lot cooler if some did.</p>
      <br></br><br></br>
      </>
      }
      {(filteredVersions && filteredVersions.length > 0) &&
      <>
      <br></br>
      <br></br>
        <br></br>
        <div className="versions-container">
          {filteredVersions &&
          filteredVersions.map((version, index) => {
            return (
              <div onClick={() => setVersion(version)}>
                <Link to={`versions/${version.id}`} className="version" key={index} style={{ textDecoration: 'none' }}>
                  <Version versionData={version}
                  setVersion={setVersion}
                  addPointsToVersion={addPointsToVersion}/>
                </Link>
              </div>)
          })}
        </div>
      </>
      }
    </div>
    }
    </>
  )
}

export default Versions