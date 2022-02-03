import { useState, useEffect } from 'react'
import Version from './version'
import FilterChip from './FilterChip'

function Versions(props) {
  const [filteredVersions, setFilteredVersions] = useState(props.versions)
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
  const [filterText, setFilterText] = useState('Show filters')
  const [fillRating, setFillRating] = useState(true)
  const [fillNewest, setFillNewest] = useState(false)
  const [fillOldest, setFillOldest] = useState(false)
  const [fillLocation, setFillLocation] = useState(false)
  const [afterDate, setAfterDate] = useState('')
  const [beforeDate, setBeforeDate] = useState('')


useEffect(() => {
  console.log('props in versions', props)
})

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
    } setFilters(newFilters)
  }, [funky, ambient, fast, slow, bliss, shred, dark, silly, guest, type2, groovy, peaks,reggae,
    heavy, jazzy, trippy, soaring, crunchy, happy, acoustic, soulful, officialRelease, sloppy])


  useEffect(() => {
    if (filters.length === 0 && !afterDate && !beforeDate) {
    setFilteredVersions(props.versions)
    } else {
      let afterTime, beforeTime
      if (afterDate) {
        afterTime = Date.parse(afterDate)
      } if (beforeDate) {
        beforeTime = Date.parse(beforeDate)
      }
        let newFilteredVersions = []
        for (var i = 0; i < props.versions.length; i++) {
          let passesFilters = true
          if (afterDate && (Date.parse(props.versions[i].date) < afterTime)) {
            passesFilters = false;
          } if (beforeDate && (Date.parse(props.versions[i].date) > beforeTime)) {
            passesFilters = false
          } if (passesFilters) {
            for (var j = 0; j < filters.length; j++) {
              let currentFilter = filters[j]
              if (!props.versions[i][currentFilter]) {
                passesFilters = false;
              }
            } if (passesFilters) {
              newFilteredVersions.push(props.versions[i])
          }
          }
        } 
        setFilteredVersions(newFilteredVersions)
    }
  }, [filters, props.versions, afterDate, beforeDate])


  useEffect(() => {
    if (showFilters) {
      setFilterText('Hide filters')
    } else {
      setFilterText('Show filters')
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
    console.log('sortedVersions', sortedVersions)
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
    console.log('sortedVersions', sortedVersions)
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
    console.log('sortedVersions', sortedVersions)
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
    console.log('sortedVersions', sortedVersions)
    setFilteredVersions(sortedVersions)
  }

  return (
    <>
    <div className="complete-versions-container">
      {(!props.versions || props.versions.length === 0) && !props.showAddVersion &&
      <>
      <p>Loading...</p>
      <br></br>
      <p>Or maybe no versions have been added yet!<br></br><br></br>If you know a good one, please add it!</p>
      </>}
      {!props.showAddVersion &&
      <>
      <button className="primary-button"
      onClick={e => props.setShowAddVersion(true)}>Add a great version</button>
      <br></br>
      <br></br>
      </>}
      {(props.versions && props.versions.length > 0) &&
      <button className="small-button show-filters-button"
      onClick={e => setShowFilters(!showFilters)}>{filterText}</button>}
      {showFilters &&
      <>
      <br></br>
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
        <FilterChip currentFilterState={tease} text='Teases' setFilter={setTease}/>
        <FilterChip currentFilterState={trippy} text='Trippy' setFilter={setTrippy}/>
        <FilterChip currentFilterState={type2} text='Type II' setFilter={setType2}/>
        <br></br><br></br>
        <label htmlFor="version">Played after this date: </label><br></br>
        <input
        className="inputField search-bar bar"
        type="date"
        placeholder=""
        value={afterDate}
        onChange={(e) => {
          setAfterDate(e.target.value)}
        }/><br></br><br></br>
        <label htmlFor="version">Played before this date: </label><br></br>
        <input
        className="inputField search-bar bar"
        type="date"
        placeholder=""
        value={beforeDate}
        onChange={(e) => {
          setBeforeDate(e.target.value)}
        }/><br></br><br></br>
        <button className="small-button" onClick={e => { setAfterDate(''); setBeforeDate('')}}>Clear date filters</button>
      </>}
      {filteredVersions && filteredVersions.length > 0 &&
      <><br></br><br></br>
      <h3>Sort by:</h3>
      <FilterChip currentFilterState={fillRating} text='Rating' setFilter={handleRatingClick}/>
      <FilterChip currentFilterState={fillNewest} text='Newest' setFilter={handleNewestClick}/>
      <FilterChip currentFilterState={fillOldest} text='Oldest' setFilter={handleOldestClick}/>
      <FilterChip currentFilterState={fillLocation} text='Location' setFilter={handleLocationClick}/>
      </>}
      {(filters && filters.length > 0) && filteredVersions.length === 0 &&
      <>
      <br></br><br></br>
        <p>Sorry, no submitted versions match those filters. It'd be a lot cooler if some did.</p>
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
          filteredVersions.map((data) => {
            return (
              <>
              <div className="version" onClick={e => props.setVersion(data)}>
                <Version versionData={data}
                setVersion={props.setVersion}
                addPointsToVersion={props.addPointsToVersion}/>
              </div>
              </>)
          })}
        </div>
      </>
      }
    </div>
    </>
  )
}

export default Versions