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
  const [submitRatingButtonText, setSubmitRatingButtonText] = useState('add your rating')
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
          setSubmitRatingButtonText('update')
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
        tagBuilder+='acoustic, '
      }
       if (version.ambient) {
        tagBuilder+='ambient, '
      }
      if (version.bliss) {
        tagBuilder+='bliss, '
      }
      if (version.bluesy) {
        tagBuilder+='bluesy, '
      }
      if (version.chaotic) {
        tagBuilder+='chaotic, '
      }
       if (version.crunchy) {
        tagBuilder+='crunchy, '
      }
      if (version.dark) {
        tagBuilder+='dark, '
      }
      if (version.dissonant) {
        tagBuilder+='dissonant, '
      }
       if (version.fast) {
        tagBuilder+='fast, '
      }
       if (version.funky) {
        tagBuilder+='funky, '
      }
       if (version.groovy) {
        tagBuilder+='groovy, '
      }
       if (version.guest) {
        tagBuilder+='guest, '
      }
       if (version.happy) {
        tagBuilder+='happy, '
      }
       if (version.heavy) {
        tagBuilder+='heavy, '
      }
       if (version.jazzy) {
        tagBuilder+='jazzy, '
      }
      if (version.long) {
        tagBuilder+='long, '
      }
      if (version.multi_part) {
        tagBuilder+='multi-part, '
      }
      if (version.official_release) {
        tagBuilder+='official release, '
      }
       if (version.peaks) {
        tagBuilder+='peaks, '
      }
       if (version.reggae) {
        tagBuilder+='reggae, '
      }
      if (version.segue) {
        tagBuilder+='segue, '
      }
       if (version.shred) {
        tagBuilder+='shred, '
      }
      if (version.silly) {
       tagBuilder+='silly, '
     }
      if (version.sloppy) {
        tagBuilder+='sloppy, '
      }
      if (version.slow) {
       tagBuilder+='slow, '
     }
      if (version.sludgy) {
        tagBuilder+='sludgy, '
      }
      if (version.soaring) {
        tagBuilder+='soaring, '
      }
      if (version.soulful) {
        tagBuilder+='soulful, '
      }
      if (version.stop_start) {
        tagBuilder+='stop-start, '
      }
      if (version.synthy) {
        tagBuilder+='synthy, '
      }
       if (version.tease) {
        tagBuilder+='teases, '
      }
      if (version.that_years_style) {
        tagBuilder+='that year\'s style, '
      }
       if (version.trippy) {
        tagBuilder+='trippy, '
      }
       if (version.type2) {
        tagBuilder+='type\u00A0II, '
      }
      if (version.unusual) {
        tagBuilder+='unusual, '
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
    setAddRatingStatus('adding tags...')
    let tagBuilder = '';
    let tagsToUpdate = {}
    if (showAddTags) {
      if (acoustic) {
        tagBuilder+='acoustic, ';
        tagsToUpdate.acoustic = true;
      }
       if (ambient) {
        tagBuilder+='ambient, '
        tagsToUpdate.ambient = true;
      }
      if (bliss) {
        tagBuilder+='bliss, '
        tagsToUpdate.bliss = true;
      }
      if (bluesy) {
        tagBuilder+='bluesy, '
        tagsToUpdate.bluesy = true;
      }
      if (chaotic) {
        tagBuilder+='chaotic, '
        tagsToUpdate.chaotic = true;
      }
       if (crunchy) {
        tagBuilder+='crunchy, '
        tagsToUpdate.crunchy = true;
      }
      if (dark) {
        tagBuilder+='dark, '
        tagsToUpdate.dark = true;
      }
      if (dissonant) {
        tagBuilder+='dissonant, '
        tagsToUpdate.dissonant = true;
      }
       if (fast) {
        tagBuilder+='fast, '
        tagsToUpdate.fast = true;
      }
       if (funky) {
        tagBuilder+='funky, '
        tagsToUpdate.funky = true;
      }
       if (groovy) {
        tagBuilder+='groovy, '
        tagsToUpdate.groovy = true;
      }
       if (guest) {
        tagBuilder+='guest, '
        tagsToUpdate.guest = true;
      }
       if (happy) {
        tagBuilder+='happy, '
        tagsToUpdate.happy = true;
      }
       if (heavy) {
        tagBuilder+='heavy, '
        tagsToUpdate.heavy = true;
      }
       if (jazzy) {
        tagBuilder+='jazzy, '
        tagsToUpdate.jazzy = true;
      }
      if (long) {
        tagBuilder+='long, '
        tagsToUpdate.long = true;
      }
      if (multiPart) {
        tagBuilder+='multi-part, '
        tagsToUpdate.multi_part = true;
      }
      if (officialRelease) {
        tagBuilder+='official release, '
        tagsToUpdate.official_release = true;
      }
       if (peaks) {
        tagBuilder+='peaks, '
        tagsToUpdate.peaks = true;
      }
       if (reggae) {
        tagBuilder+='reggae, '
        tagsToUpdate.reggae = true;
      }
      if (segue) {
        tagBuilder+='segue, '
        tagsToUpdate.segue = true;
      }
       if (shred) {
        tagBuilder+='shred, '
        tagsToUpdate.shred = true;
      }
      if (silly) {
       tagBuilder+='silly, '
       tagsToUpdate.silly = true;
     }
      if (sloppy) {
        tagBuilder+='sloppy, '
        tagsToUpdate.sloppy = true;
      }
      if (slow) {
       tagBuilder+='slow, '
       tagsToUpdate.slow = true;
     }
      if (sludgy) {
        tagBuilder+='sludgy, '
        tagsToUpdate.sludgy = true;
      }
      if (soaring) {
        tagBuilder+='soaring, '
        tagsToUpdate.soaring = true;
      }
      if (soulful) {
        tagBuilder+='soulful, '
        tagsToUpdate.soulful = true;
      }
      if (stopStart) {
        tagBuilder+='stop-start, '
        tagsToUpdate.stop_start = true;
      }
      if (synthy) {
        tagBuilder+='synthy, '
        tagsToUpdate.synthy = true;
      }
       if (tease) {
        tagBuilder+='teases, '
        tagsToUpdate.tease = true;
      }
      if (thatYearsStyle) {
        tagBuilder+='that year\'s style, '
        tagsToUpdate.that_years_style = true;
      }
       if (trippy) {
        tagBuilder+='trippy, '
        tagsToUpdate.trippy = true;
      }
       if (type2) {
        tagBuilder+='type\u00A0II, '
        tagsToUpdate.type2 = true;
      }
      if (unusual) {
        tagBuilder+='unusual, '
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
        setAddRatingStatus('unable to update tags at this time.')
      } else {
        updateTags(tagsToUpdate)
      }
    } else {
      setAddRatingStatus('added your rating, thanks for contributing!')
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
      setAddRatingStatus('added/updated your rating and added tags, thanks for contributing!')
      fetchVersions(song.id)
    }
  }

  function handleBackClick() {
    fetchRatings(version.id)
    setShowingAddRating(false)
  }


  return (
      <div className="add-rating-wrapper">
      {!user &&
      <h3>please sign in to contribute</h3>}
      {user &&
      <>
        <label htmlFor="rating">your rating: </label>
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
        <label htmlFor="comment" className="comment-box-label">comments (optional): </label>
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
        <button className="small-button" onClick={e => setShowAddTags(true)}>add tags</button><br></br>
        </>}
        {showAddTags &&
        <>
        <p>current tags: {tagText}.<br></br><br></br> please select all other tags that you feel apply to this version:</p>
        <br></br>
        <div className="tags">
          {!version.acoustic &&
          <FilterChip currentFilterState={acoustic} text='acoustic' setFilter={setAcoustic}/>
          }
          {!version.ambient &&
          <FilterChip currentFilterState={ambient} text='ambient/space' setFilter={setAmbient}/>
          }
          {!version.bliss &&
          <FilterChip currentFilterState={bliss} text='bliss' setFilter={setBliss}/>
        }
        {!version.bluesy &&
          <FilterChip currentFilterState={bluesy} text='bluesy' setFilter={setBluesy}/>
        }
        {!version.chaotic &&
          <FilterChip currentFilterState={chaotic} text='chaotic' setFilter={setChaotic}/>
        }
        {!version.crunchy &&
          <FilterChip currentFilterState={crunchy} text='crunchy' setFilter={setCrunchy}/>
        }
        {!version.dark &&
          <FilterChip currentFilterState={dark} text='dark' setFilter={setDark}/>
        }
        {!version.dissonant &&
          <FilterChip currentFilterState={dissonant} text='dissonant' setFilter={setDissonant}/>
        }
        {!version.fast &&
          <FilterChip currentFilterState={fast} text='fast' setFilter={setFast}/>
        }
        {!version.funky &&
          <FilterChip currentFilterState={funky} text='funky' setFilter={setFunky}/>
        }
        {!version.groovy &&
          <FilterChip currentFilterState={groovy} text='groovy' setFilter={setGroovy}/>
        }
        {!version.guest &&
          <FilterChip currentFilterState={guest} text='guest' setFilter={setGuest}/>
        }
        {!version.happy &&
          <FilterChip currentFilterState={happy} text='happy' setFilter={setHappy}/>
        }
        {!version.heavy &&
          <FilterChip currentFilterState={heavy} text='heavy' setFilter={setHeavy}/>
        }
        {!version.jazzy &&
          <FilterChip currentFilterState={jazzy} text='jazzy' setFilter={setJazzy}/>
        }
        {!version.long &&
          <FilterChip currentFilterState={long} text='long' setFilter={setLong}/>
        }
        {!version.multi_part &&
          <FilterChip currentFilterState={multiPart} text='multi-part' setFilter={setMultiPart}/>
        }
        {!version.official_release &&
          <FilterChip currentFilterState={officialRelease} text='official release' setFilter={setOfficialRelease}/>
        }
        {!version.peaks &&
          <FilterChip currentFilterState={peaks} text='peaks' setFilter={setPeaks}/>
        }
        {!version.reggae &&
          <FilterChip currentFilterState={reggae} text='reggae' setFilter={setReggae}/>
        }
        {!version.segue &&
          <FilterChip currentFilterState={segue} text='segue' setFilter={setSegue}/>
        }
        {!version.shred &&
          <FilterChip currentFilterState={shred} text='shred' setFilter={setShred}/>
        }
        {!version.silly &&
          <FilterChip currentFilterState={silly} text='silly' setFilter={setSilly}/>
        }
        {!version.sloppy &&
          <FilterChip currentFilterState={sloppy} text='sloppy' setFilter={setSloppy}/>
        }
        {!version.slow &&
          <FilterChip currentFilterState={slow} text='slow' setFilter={setSlow}/>
        }
        {!version.sludgy &&
          <FilterChip currentFilterState={sludgy} text='sludgy' setFilter={setSludgy}/>
        }
        {!version.soaring &&
          <FilterChip currentFilterState={soaring} text='soaring' setFilter={setSoaring}/>
        }
        {!version.soulful &&
          <FilterChip currentFilterState={soulful} text='soulful' setFilter={setSoulful}/>
        }
        {!version.stop_start &&
          <FilterChip currentFilterState={stopStart} text='stop-start' setFilter={setStopStart}/>
        }
        {!version.synthy &&
          <FilterChip currentFilterState={synthy} text='synthy' setFilter={setSynthy}/>
        }
        {!version.tease &&
          <FilterChip currentFilterState={tease} text='teases' setFilter={setTease}/>
        }
        {!version.this_years_style &&
          <FilterChip currentFilterState={thatYearsStyle} text="that year's style" setFilter={setThatYearsStyle}/>
        }
        {!version.trippy &&
          <FilterChip currentFilterState={trippy} text='trippy' setFilter={setTrippy}/>
        }
        {!version.type2 &&
          <FilterChip currentFilterState={type2} text='type II' setFilter={setType2}/>
        }
        {!version.unusual &&
          <FilterChip currentFilterState={unusual} text='unusual' setFilter={setUnusual}/>
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
      <button className="small-button" onClick={() => handleBackClick()}>back</button>
      </>}
      </div>
  )

}

export default AddRating