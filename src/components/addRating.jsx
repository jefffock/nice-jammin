import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'
import FilterChip from './FilterChip'

function AddRating({ artists, artist, songs, song, versions, version, user, username, addOnePoint,
  addTenPoints, canWrite, setArtist, setSong, calcAverageForVersion, fetchRatings, fetchVersions,
  addRatingCountToArtist, addRatingCountToSong, setShowingAddRating, setRatingAdded }) {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [userAlreadyRated, setUserAlreadyRated] = useState(false)
  const [submitRatingButtonText, setSubmitRatingButtonText] = useState('Add your rating')
  const [addRatingStatus, setAddRatingStatus] = useState('')
  const [showAddTags, setShowAddTags] = useState(false)
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
  const [tagText, setTagText] = useState('')

  useEffect(() => {
    if (user) {
    async function checkUserAlreadyRated() {
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('submitter_name', username)
        .eq('version_id', version.id)
      if (error) {
        console.log('error in checkUserAlreadyRated', error)
      } else {
        if (data.length > 0) {
          setComment(data[0].comment)
          setRating(data[0].rating)
          setUserAlreadyRated(true)
          setSubmitRatingButtonText('Update')
        }
      }
    }
    checkUserAlreadyRated()
    }
  }, [user, username, version])

  // useEffect(() => {
  //   if (!user) {
  //     setAddRatingStatus('Please log in to add your comments and rating')
  //   }
  // }, [user])

  useEffect(() => {
    setCharCount(comment.length)
  }, [comment])

  useEffect(() => {
    if (version) {

      let tagBuilder = '';
      if (version.acoustic) {
        tagBuilder+='Acoustic, '
      }
       if (version.ambient) {
        tagBuilder+='Ambient, '
      }
      if (version.bliss) {
        tagBuilder+='Bliss, '
      }
      if (version.bluesy) {
        tagBuilder+='Bluesy, '
      }
      if (version.chaotic) {
        tagBuilder+='Chaotic, '
      }
       if (version.crunchy) {
        tagBuilder+='Crunchy, '
      }
      if (version.dark) {
        tagBuilder+='Dark, '
      }
      if (version.dissonant) {
        tagBuilder+='Dissonant, '
      }
       if (version.fast) {
        tagBuilder+='Fast, '
      }
       if (version.funky) {
        tagBuilder+='Funky, '
      }
       if (version.groovy) {
        tagBuilder+='Groovy, '
      }
       if (version.guest) {
        tagBuilder+='Guest, '
      }
       if (version.happy) {
        tagBuilder+='Happy, '
      }
       if (version.heavy) {
        tagBuilder+='Heavy, '
      }
       if (version.jazzy) {
        tagBuilder+='Jazzy, '
      }
      if (version.long) {
        tagBuilder+='Long, '
      }
      if (version.multi_part) {
        tagBuilder+='Multi-part, '
      }
      if (version.official_release) {
        tagBuilder+='Official release, '
      }
       if (version.peaks) {
        tagBuilder+='Peaks, '
      }
       if (version.reggae) {
        tagBuilder+='Reggae, '
      }
      if (version.segue) {
        tagBuilder+='Segue, '
      }
       if (version.shred) {
        tagBuilder+='Shred, '
      }
      if (version.silly) {
       tagBuilder+='Silly, '
     }
      if (version.sloppy) {
        tagBuilder+='Sloppy, '
      }
      if (version.slow) {
       tagBuilder+='Slow, '
     }
      if (version.sludgy) {
        tagBuilder+='Sludgy, '
      }
      if (version.soaring) {
        tagBuilder+='Soaring, '
      }
      if (version.soulful) {
        tagBuilder+='Soulful, '
      }
      if (version.stop_start) {
        tagBuilder+='Stop-start, '
      }
      if (version.synthy) {
        tagBuilder+='Synthy, '
      }
       if (version.tease) {
        tagBuilder+='Teases, '
      }
      if (version.that_years_style) {
        tagBuilder+='That year\'s style, '
      }
       if (version.trippy) {
        tagBuilder+='Trippy, '
      }
       if (version.type2) {
        tagBuilder+='Type\u00A0II, '
      }
      if (version.unusual) {
        tagBuilder+='Unusual, '
      }
      let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
      setTagText(finalTags)
    }
  }, [version])

  async function testRating() {
    let ratingValid = true
    if (!user || !canWrite) {
      ratingValid = false
    } if (rating < 1 || rating > 10) {
      ratingValid = false
    }
    setLoading(true)
    setAddRatingStatus('Checking your rating...')
    if (charCount > 10000) {
      ratingValid = false
      alert(`Your enthusiasm is commendable! Also, character limit exceeded`)
      setAddRatingStatus('')
    } if (ratingValid) {
      if (userAlreadyRated) {
        updateRating()
      } else {
        insertRating()
      }
    }
  }

  async function updateRating() {
    setAddRatingStatus('Updating Rating...')
    const { error } = await supabase
      .from('ratings')
      .update({
        comment: comment,
        rating: rating
      })
      .match({submitter_name: username, version_id: version.id})
    if (error) {
      setAddRatingStatus('Unable to update your comments and rating at this time')
    } else {
      setAddRatingStatus('Updated your comments and rating')
      calcAverageForVersion(version.id)
      insertUpdateTags()
    }
  }

  async function insertRating() {
    setAddRatingStatus('Adding your rating...')
    const {  error } = await supabase
      .from('ratings')
      .insert(
        { user_id: user.id,
          version_id: version.id,
          submitter_name: username,
          rating: rating,
          comment: comment
        }, {returning: 'minimal'})
      if (error) {
        setAddRatingStatus('Unable to add your rating at this time.')
      } else {
        setAddRatingStatus('Added your rating')
        setRatingAdded(true)
        insertUpdateTags()
        fetchRatings(version.id)
        fetchVersions()
        addOnePoint(version.submitter_name)
        addOnePoint(song.submitter_name)
        addTenPoints(username)
        addRatingCountToSong(song.id)
        addRatingCountToArtist(artist.id)
        calcAverageForVersion(version.id)
        setShowingAddRating(false)
      }
  }

  async function insertUpdateTags() {
    setAddRatingStatus('Adding tags...')
    let tagBuilder = '';
    let tagsToUpdate = {}
    if (showAddTags) {
      if (acoustic) {
        tagBuilder+='Acoustic, ';
        tagsToUpdate.acoustic = true;
      }
       if (ambient) {
        tagBuilder+='Ambient, '
        tagsToUpdate.ambient = true;
      }
      if (bliss) {
        tagBuilder+='Bliss, '
        tagsToUpdate.bliss = true;
      }
      if (bluesy) {
        tagBuilder+='Bluesy, '
        tagsToUpdate.bluesy = true;
      }
      if (chaotic) {
        tagBuilder+='Chaotic, '
        tagsToUpdate.chaotic = true;
      }
       if (crunchy) {
        tagBuilder+='Crunchy, '
        tagsToUpdate.crunchy = true;
      }
      if (dark) {
        tagBuilder+='Dark, '
        tagsToUpdate.dark = true;
      }
      if (dissonant) {
        tagBuilder+='Dissonant, '
        tagsToUpdate.dissonant = true;
      }
       if (fast) {
        tagBuilder+='Fast, '
        tagsToUpdate.fast = true;
      }
       if (funky) {
        tagBuilder+='Funky, '
        tagsToUpdate.funky = true;
      }
       if (groovy) {
        tagBuilder+='Groovy, '
        tagsToUpdate.groovy = true;
      }
       if (guest) {
        tagBuilder+='Guest, '
        tagsToUpdate.guest = true;
      }
       if (happy) {
        tagBuilder+='Happy, '
        tagsToUpdate.happy = true;
      }
       if (heavy) {
        tagBuilder+='Heavy, '
        tagsToUpdate.heavy = true;
      }
       if (jazzy) {
        tagBuilder+='Jazzy, '
        tagsToUpdate.jazzy = true;
      }
      if (long) {
        tagBuilder+='Long, '
        tagsToUpdate.long = true;
      }
      if (multiPart) {
        tagBuilder+='Multi-part, '
        tagsToUpdate.multi_part = true;
      }
      if (officialRelease) {
        tagBuilder+='Official release, '
        tagsToUpdate.official_release = true;
      }
       if (peaks) {
        tagBuilder+='Peaks, '
        tagsToUpdate.peaks = true;
      }
       if (reggae) {
        tagBuilder+='Reggae, '
        tagsToUpdate.reggae = true;
      }
      if (segue) {
        tagBuilder+='Segue, '
        tagsToUpdate.segue = true;
      }
       if (shred) {
        tagBuilder+='Shred, '
        tagsToUpdate.shred = true;
      }
      if (silly) {
       tagBuilder+='Silly, '
       tagsToUpdate.silly = true;
     }
      if (sloppy) {
        tagBuilder+='Sloppy, '
        tagsToUpdate.sloppy = true;
      }
      if (slow) {
       tagBuilder+='Slow, '
       tagsToUpdate.slow = true;
     }
      if (sludgy) {
        tagBuilder+='Sludgy, '
        tagsToUpdate.sludgy = true;
      }
      if (soaring) {
        tagBuilder+='Soaring, '
        tagsToUpdate.soaring = true;
      }
      if (soulful) {
        tagBuilder+='Soulful, '
        tagsToUpdate.soulful = true;
      }
      if (stopStart) {
        tagBuilder+='Stop-start, '
        tagsToUpdate.stop_start = true;
      }
      if (synthy) {
        tagBuilder+='Synthy, '
        tagsToUpdate.synthy = true;
      }
       if (tease) {
        tagBuilder+='Teases, '
        tagsToUpdate.tease = true;
      }
      if (thatYearsStyle) {
        tagBuilder+='That year\'s style, '
        tagsToUpdate.that_years_style = true;
      }
       if (trippy) {
        tagBuilder+='Trippy, '
        tagsToUpdate.trippy = true;
      }
       if (type2) {
        tagBuilder+='Type\u00A0II, '
        tagsToUpdate.type2 = true;
      }
      if (unusual) {
        tagBuilder+='Unusual, '
        tagsToUpdate.unusual = true;
      }
    } else {
      fetchVersions(song.id)
      setAddRatingStatus('Added your rating. Thanks for contributing!')
    }
    let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    let tagsLength = finalTags.length;
    if (finalTags.length > 0) {
      const { error } = await supabase
        .from('update_tags')
        .insert({
          version_id: version.id,
          username: username,
          tags_added: finalTags,
          length: tagsLength
        })
      if (error) {
        setAddRatingStatus('Unable to update tags at this time.')
      } else {
        updateTags(tagsToUpdate)
      }
    } else {
      setAddRatingStatus('Added your rating. Thanks for contributing!')
      fetchVersions(song.id)
    }
  }

  async function updateTags(tagsToUpdate) {
    const { error } = await supabase
      .from('versions')
      .update(tagsToUpdate)
      .match({id:version.id})
    if (error) {
      setAddRatingStatus('Unable to update tags at this time.')
    } else {
      setAddRatingStatus('Added/updated rating and added tags. Thanks for contributing!')
      fetchVersions(song.id)
    }
  }

  function handleBackClick() {
    fetchRatings(version.id)
    setShowingAddRating(false)
  }

  // return (
  //   <h1>AddRating</h1>
  // )


  return (
    // <div className="add-rating-container">
      <div className="add-rating-wrapper">
      {/* <h2>Your Rating</h2> */}
      {!user &&
      <h3>Please sign in to contribute</h3>}
      {user &&
      <>
        <label htmlFor="rating">Your Rating: </label>
        <select
        name="rating"
        id="rating"
        className="inputField rating-select"
        placeholder=""
        value={rating}
        onChange={e => setRating(JSON.parse(e.target.value))}>
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <br></br>
        <br></br>
        <label htmlFor="comment" className="comment-box-label">Comments (optional): </label>
        <br></br>
        <textarea
        type="text-area"
        name="comment"
        className="inputField comment-box"
        placeholder="Face = melted"
        cols="35"
        rows="10"
        value={comment}
        onChange={e => setComment(e.target.value)}></textarea>
        {(charCount > 9000) &&
        <p>{10000 - charCount} characters left</p>}
        <br></br>
        <br></br>
        {!showAddTags &&
        <>
        <button className="small-button" onClick={e => setShowAddTags(true)}>Add tags</button><br></br>
        </>}
        {showAddTags &&
        <>
        <p>Current tags: {tagText}.<br></br><br></br> Please select all other tags that you feel apply to this version:</p>
        <br></br>
        <div className="tags">
          {!version.acoustic &&
          <FilterChip currentFilterState={acoustic} text='Acoustic' setFilter={setAcoustic}/>
          }
          {!version.ambient &&
          <FilterChip currentFilterState={ambient} text='Ambient/Space' setFilter={setAmbient}/>
          }
          {!version.bliss &&
          <FilterChip currentFilterState={bliss} text='Bliss' setFilter={setBliss}/>
        }
        {!version.bluesy &&
          <FilterChip currentFilterState={bluesy} text='Bluesy' setFilter={setBluesy}/>
        }
        {!version.chaotic &&
          <FilterChip currentFilterState={chaotic} text='Chaotic' setFilter={setChaotic}/>
        }
        {!version.crunchy &&
          <FilterChip currentFilterState={crunchy} text='Crunchy' setFilter={setCrunchy}/>
        }
        {!version.dark &&
          <FilterChip currentFilterState={dark} text='Dark' setFilter={setDark}/>
        }
        {!version.dissonant &&
          <FilterChip currentFilterState={dissonant} text='Dissonant' setFilter={setDissonant}/>
        }
        {!version.fast &&
          <FilterChip currentFilterState={fast} text='Fast' setFilter={setFast}/>
        }
        {!version.funky &&
          <FilterChip currentFilterState={funky} text='Funky' setFilter={setFunky}/>
        }
        {!version.groovy &&
          <FilterChip currentFilterState={groovy} text='Groovy' setFilter={setGroovy}/>
        }
        {!version.guest &&
          <FilterChip currentFilterState={guest} text='Guest' setFilter={setGuest}/>
        }
        {!version.happy &&
          <FilterChip currentFilterState={happy} text='Happy' setFilter={setHappy}/>
        }
        {!version.heavy &&
          <FilterChip currentFilterState={heavy} text='Heavy' setFilter={setHeavy}/>
        }
        {!version.jazzy &&
          <FilterChip currentFilterState={jazzy} text='Jazzy' setFilter={setJazzy}/>
        }
        {!version.long &&
          <FilterChip currentFilterState={long} text='Long' setFilter={setLong}/>
        }
        {!version.multi_part &&
          <FilterChip currentFilterState={multiPart} text='Multi-part' setFilter={setMultiPart}/>
        }
        {!version.official_release &&
          <FilterChip currentFilterState={officialRelease} text='Official Release' setFilter={setOfficialRelease}/>
        }
        {!version.peaks &&
          <FilterChip currentFilterState={peaks} text='Peaks' setFilter={setPeaks}/>
        }
        {!version.reggae &&
          <FilterChip currentFilterState={reggae} text='Reggae' setFilter={setReggae}/>
        }
        {!version.segue &&
          <FilterChip currentFilterState={segue} text='Segue' setFilter={setSegue}/>
        }
        {!version.shred &&
          <FilterChip currentFilterState={shred} text='Shred' setFilter={setShred}/>
        }
        {!version.silly &&
          <FilterChip currentFilterState={silly} text='Silly' setFilter={setSilly}/>
        }
        {!version.sloppy &&
          <FilterChip currentFilterState={sloppy} text='Sloppy' setFilter={setSloppy}/>
        }
        {!version.slow &&
          <FilterChip currentFilterState={slow} text='Slow' setFilter={setSlow}/>
        }
        {!version.sludgy &&
          <FilterChip currentFilterState={sludgy} text='Sludgy' setFilter={setSludgy}/>
        }
        {!version.soaring &&
          <FilterChip currentFilterState={soaring} text='Soaring' setFilter={setSoaring}/>
        }
        {!version.soulful &&
          <FilterChip currentFilterState={soulful} text='Soulful' setFilter={setSoulful}/>
        }
        {!version.stop_start &&
          <FilterChip currentFilterState={stopStart} text='Stop-start' setFilter={setStopStart}/>
        }
        {!version.synthy &&
          <FilterChip currentFilterState={synthy} text='Synthy' setFilter={setSynthy}/>
        }
        {!version.tease &&
          <FilterChip currentFilterState={tease} text='Teases' setFilter={setTease}/>
        }
        {!version.this_years_style &&
          <FilterChip currentFilterState={thatYearsStyle} text="That Year's Style" setFilter={setThatYearsStyle}/>
        }
        {!version.trippy &&
          <FilterChip currentFilterState={trippy} text='Trippy' setFilter={setTrippy}/>
        }
        {!version.type2 &&
          <FilterChip currentFilterState={type2} text='Type II' setFilter={setType2}/>
        }
        {!version.unusual &&
          <FilterChip currentFilterState={unusual} text='Unusual' setFilter={setUnusual}/>
        }
          </div>
          <br></br>
        </>}
        <button className="primary-button"
        onClick={e => testRating()}
        disabled={loading}>{submitRatingButtonText}</button>
        <br></br>
        <br></br>
        <p>{addRatingStatus}</p>
        <br></br>
        <br></br>
      <button className="small-button" onClick={() => handleBackClick()}>Back</button>
      </>}
      </div>
    // </div>
  )

}

export default AddRating