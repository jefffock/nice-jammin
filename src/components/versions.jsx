import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
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
  const [filterText, setFilterText] = useState('Show filters')

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
    if (filters.length === 0) {
      setFilteredVersions(props.versions)
    } else {
      let newFilteredVersions = []
      for (var i = 0; i < props.versions.length; i++) {
        let passesFilters = true
        for (var j = 0; j < filters.length; j++) {
          let currentFilter = filters[j]
          if (!props.versions[i][currentFilter]) {
            passesFilters = false;
            break;
          }
        } if (passesFilters) {
          newFilteredVersions.push(props.versions[i])
        }
      } setFilteredVersions(newFilteredVersions)
    }
  }, [filters, props.versions])

  useEffect(() => {
    if (showFilters) {
      setFilterText('Hide filters')
    } else {
      setFilterText('Show filters')
    }
  }, [showFilters])

  return (
    <>
      {props.versions.length > 0 &&
      <h3>Versions</h3>}
      {props.versions.length === 0 &&
      <>
      <p>No versions submitted yet!</p>
      <br></br>
      </>}
      <button className="primary-button"
      onClick={e => props.setShowAddVersion(true)}>Add a great version</button>
      <br></br>
      <br></br>
      <button className="small-button"
      onClick={e => setShowFilters(!showFilters)}>{filterText}</button>
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
        <FilterChip currentFilterState={trippy} text='Trippy' setFilter={setTrippy}/>
        <FilterChip currentFilterState={type2} text='Type II' setFilter={setType2}/>
      </>}
      {filteredVersions.length > 0 &&
      <>
      <br></br>
      <br></br>
        <p>Choose a Date to view comments:</p>
        <br></br>
        <div className="versions">
          <p className="version-col1">Date</p>
          <p className="version-col2">Average</p>
          <p className="version-col3">Tags</p>
          <p className="version-col4">Added by</p>
          <div className="line"></div>
          {filteredVersions &&
          filteredVersions.map((data) => {
            return (
                <Version versionData={data}
                handleVersionChange={props.handleVersionChange}/>)
          })}
        </div>
      </>
      }
    </>
  )
}

export default Versions