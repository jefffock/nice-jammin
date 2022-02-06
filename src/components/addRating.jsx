import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'
import FilterChip from './FilterChip'

function AddRating(props) {
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
    console.log('props in add rating', props)
    if (props.user) {
    async function checkUserAlreadyRated() {
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('submitter_name', props.username)
        .eq('version_id', props.version.id)
      if (error) {
        console.log('error in checkUserAlreadyRated', error)
      } else {
        if (data.length > 0) {
          setComment(data[0].comment)
          setRating(data[0].rating)
          setUserAlreadyRated(true)
          setSubmitRatingButtonText('Update your comments')
        }
      }
    }
    checkUserAlreadyRated()
    }
  }, [props])

  useEffect(() => {
    if (!props.user) {
      setAddRatingStatus('Please log in to add your comments and rating')
    }
  }, [props.user])

  useEffect(() => {
    setCharCount(comment.length)
  }, [comment])

  useEffect(() => {
    let tagBuilder = '';
    if (props.version.acoustic) {
      tagBuilder+='Acoustic, '
    }
     if (props.version.ambient) {
      tagBuilder+='Ambient, '
    }
    if (props.version.bliss) {
      tagBuilder+='Bliss, '
    }
    if (props.version.bluesy) {
      tagBuilder+='Bluesy, '
    }
    if (props.version.chaotic) {
      tagBuilder+='Chaotic, '
    }
     if (props.version.crunchy) {
      tagBuilder+='Crunchy, '
    }
    if (props.version.dark) {
      tagBuilder+='Dark, '
    }
    if (props.version.dissonant) {
      tagBuilder+='Dissonant, '
    }
     if (props.version.fast) {
      tagBuilder+='Fast, '
    }
     if (props.version.funky) {
      tagBuilder+='Funky, '
    }
     if (props.version.groovy) {
      tagBuilder+='Groovy, '
    }
     if (props.version.guest) {
      tagBuilder+='Guest, '
    }
     if (props.version.happy) {
      tagBuilder+='Happy, '
    }
     if (props.version.heavy) {
      tagBuilder+='Heavy, '
    }
     if (props.version.jazzy) {
      tagBuilder+='Jazzy, '
    }
    if (props.version.long) {
      tagBuilder+='Long, '
    }
    if (props.version.multi_part) {
      tagBuilder+='Multi-part, '
    }
    if (props.version.official_release) {
      tagBuilder+='Official release, '
    }
     if (props.version.peaks) {
      tagBuilder+='Peaks, '
    }
     if (props.version.reggae) {
      tagBuilder+='Reggae, '
    }
    if (props.version.segue) {
      tagBuilder+='Segue, '
    }
     if (props.version.shred) {
      tagBuilder+='Shred, '
    }
    if (props.version.silly) {
     tagBuilder+='Silly, '
   }
    if (props.version.sloppy) {
      tagBuilder+='Sloppy, '
    }
    if (props.version.slow) {
     tagBuilder+='Slow, '
   }
    if (props.version.sludgy) {
      tagBuilder+='Sludgy, '
    }
    if (props.version.soaring) {
      tagBuilder+='Soaring, '
    }
    if (props.version.soulful) {
      tagBuilder+='Soulful, '
    }
    if (props.version.stop_start) {
      tagBuilder+='Stop-start, '
    }
    if (props.version.synthy) {
      tagBuilder+='Synthy, '
    }
     if (props.version.tease) {
      tagBuilder+='Teases, '
    }
    if (props.version.that_years_style) {
      tagBuilder+='That year\'s style, '
    }
     if (props.version.trippy) {
      tagBuilder+='Trippy, '
    }
     if (props.version.type2) {
      tagBuilder+='Type\u00A0II, '
    }
    if (props.version.unusual) {
      tagBuilder+='Unusual, '
    }
    let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    setTagText(finalTags)
  }, [props])

  async function testRating() {
    let ratingValid = true
    if (!props.user || !props.canWrite) {
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
      .match({submitter_name: props.username, version_id: props.version.id})
    if (error) {
      setAddRatingStatus('Unable to update your comments and rating at this time')
    } else {
      setAddRatingStatus('Updated your comments and rating')
      props.calcAverageForVersion(props.version.id)
      insertUpdateTags()
    }
  }

  async function insertRating() {
    setAddRatingStatus('Adding your rating...')
    const {  error } = await supabase
      .from('ratings')
      .insert(
        { user_id: props.user.id,
          version_id: props.version.id,
          submitter_name: props.username,
          rating: rating,
          comment: comment
        }, {returning: 'minimal'})
      if (error) {
        setAddRatingStatus('Unable to add your rating at this time.')
      } else {
        setAddRatingStatus('Added your rating')
        insertUpdateTags()
        props.addOnePoint(props.version.submitter_name)
        props.addOnePoint(props.songData.submitter_name)
        props.addTenPoints(props.username)
        props.addRatingCountToSong(props.songData.id)
        props.addRatingCountToArtist(props.artist.id)
        props.calcAverageForVersion(props.version.id)
      }
  }

  async function insertUpdateTags() {
    console.log('in insert update tags')
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
    }
    let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    console.log('finalTags', finalTags)
    let tagsLength = finalTags.length;
    console.log('tagsLength', tagsLength)
    if (finalTags.length > 0) {
      const { error } = await supabase
        .from('update_tags')
        .insert({
          version_id: props.version.id,
          username: props.username,
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
    }
  }

  async function updateTags(tagsToUpdate) {
    const { error } = await supabase
      .from('versions')
      .update(tagsToUpdate)
      .match({id: props.version.id})
    if (error) {
      setAddRatingStatus('Unable to update tags at this time.')
    } else {
      setAddRatingStatus('Added/updated rating and added tags. Thanks for contributing!')
      props.fetchVersions(props.songData.id)
    }
  }

  function handleBackClick() {
    props.fetchRatings(props.version.id)
    props.setShowAddRating(false)
  }

  return (
    <div className="add-rating-container">
      <div className="add-rating-wrapper">
      <h2>Add Rating</h2>
        <label htmlFor="rating">Rating: </label>
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
        <button className="small-button" onClick={e => setShowAddTags(true)}>Add tags</button><br></br><br></br>
        </>}
        {showAddTags &&
        <>
        <p>Current tags: {tagText}.<br></br><br></br> Please select all other tags that apply to this version:</p>
        <br></br>
        <div className="tags">
          {!props.version.acoustic &&
          <FilterChip currentFilterState={acoustic} text='Acoustic' setFilter={setAcoustic}/>
          }
          {!props.version.ambient &&
          <FilterChip currentFilterState={ambient} text='Ambient/Space' setFilter={setAmbient}/>
          }
          {!props.version.bliss &&
          <FilterChip currentFilterState={bliss} text='Bliss' setFilter={setBliss}/>
        }
        {!props.version.bluesy &&
          <FilterChip currentFilterState={bluesy} text='Bluesy' setFilter={setBluesy}/>
        }
        {!props.version.chaotic &&
          <FilterChip currentFilterState={chaotic} text='Chaotic' setFilter={setChaotic}/>
        }
        {!props.version.crunchy &&
          <FilterChip currentFilterState={crunchy} text='Crunchy' setFilter={setCrunchy}/>
        }
        {!props.version.dark &&
          <FilterChip currentFilterState={dark} text='Dark' setFilter={setDark}/>
        }
        {!props.version.dissonant &&
          <FilterChip currentFilterState={dissonant} text='Dissonant' setFilter={setDissonant}/>
        }
        {!props.version.fast &&
          <FilterChip currentFilterState={fast} text='Fast' setFilter={setFast}/>
        }
        {!props.version.funky &&
          <FilterChip currentFilterState={funky} text='Funky' setFilter={setFunky}/>
        }
        {!props.version.groovy &&
          <FilterChip currentFilterState={groovy} text='Groovy' setFilter={setGroovy}/>
        }
        {!props.version.guest &&
          <FilterChip currentFilterState={guest} text='Guest' setFilter={setGuest}/>
        }
        {!props.version.happy &&
          <FilterChip currentFilterState={happy} text='Happy' setFilter={setHappy}/>
        }
        {!props.version.heavy &&
          <FilterChip currentFilterState={heavy} text='Heavy' setFilter={setHeavy}/>
        }
        {!props.version.jazzy &&
          <FilterChip currentFilterState={jazzy} text='Jazzy' setFilter={setJazzy}/>
        }
        {!props.version.long &&
          <FilterChip currentFilterState={long} text='Long' setFilter={setLong}/>
        }
        {!props.version.multi_part &&
          <FilterChip currentFilterState={multiPart} text='Multi-part' setFilter={setMultiPart}/>
        }
        {!props.version.official_release &&
          <FilterChip currentFilterState={officialRelease} text='Official Release' setFilter={setOfficialRelease}/>
        }
        {!props.version.peaks &&
          <FilterChip currentFilterState={peaks} text='Peaks' setFilter={setPeaks}/>
        }
        {!props.version.reggae &&
          <FilterChip currentFilterState={reggae} text='Reggae' setFilter={setReggae}/>
        }
        {!props.version.segue &&
          <FilterChip currentFilterState={segue} text='Segue' setFilter={setSegue}/>
        }
        {!props.version.shred &&
          <FilterChip currentFilterState={shred} text='Shred' setFilter={setShred}/>
        }
        {!props.version.silly &&
          <FilterChip currentFilterState={silly} text='Silly' setFilter={setSilly}/>
        }
        {!props.version.sloppy &&
          <FilterChip currentFilterState={sloppy} text='Sloppy' setFilter={setSloppy}/>
        }
        {!props.version.slow &&
          <FilterChip currentFilterState={slow} text='Slow' setFilter={setSlow}/>
        }
        {!props.version.sludgy &&
          <FilterChip currentFilterState={sludgy} text='Sludgy' setFilter={setSludgy}/>
        }
        {!props.version.soaring &&
          <FilterChip currentFilterState={soaring} text='Soaring' setFilter={setSoaring}/>
        }
        {!props.version.soulful &&
          <FilterChip currentFilterState={soulful} text='Soulful' setFilter={setSoulful}/>
        }
        {!props.version.stop_start &&
          <FilterChip currentFilterState={stopStart} text='Stop-start' setFilter={setStopStart}/>
        }
        {!props.version.synthy &&
          <FilterChip currentFilterState={synthy} text='Synthy' setFilter={setSynthy}/>
        }
        {!props.version.tease &&
          <FilterChip currentFilterState={tease} text='Teases' setFilter={setTease}/>
        }
        {!props.version.this_years_style &&
          <FilterChip currentFilterState={thatYearsStyle} text="That Year's Style" setFilter={setThatYearsStyle}/>
        }
        {!props.version.trippy &&
          <FilterChip currentFilterState={trippy} text='Trippy' setFilter={setTrippy}/>
        }
        {!props.version.type2 &&
          <FilterChip currentFilterState={type2} text='Type II' setFilter={setType2}/>
        }
        {!props.version.unusual &&
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
      <button className="small-button" onClick={e => handleBackClick()}>Back</button>
      </div>
    </div>
  )
}

export default AddRating