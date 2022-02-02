import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'

function AddRating(props) {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [userAlreadyRated, setUserAlreadyRated] = useState(false)
  const [submitRatingButtonText, setSubmitRatingButtonText] = useState('Add your rating')
  const [addRatingStatus, setAddRatingStatus] = useState('')

  useEffect(() => {
    console.log('props in add review', props)
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
        console.log('data in check user already rated', data)
        if (data.length > 0) {
          setComment(data[0].comment)
          setRating(data[0].rating)
          setUserAlreadyRated(true)
          setSubmitRatingButtonText('Update your comments')
          console.log('we have data')
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

  async function testRating() {
    let ratingValid = true
    if (!props.user) {
      ratingValid = false
    } if (rating < 1 || rating > 10) {
      ratingValid = false
    }
    setLoading(true)
    setAddRatingStatus('Checking your rating')
    console.log('rating:', rating, 'comment', comment)
    if (charCount > 10000) {
      ratingValid = false
      alert(`Your enthusiasm is commendable! Also, character limit exceeded`)
      setAddRatingStatus('')
    } if (ratingValid) {
      console.log('rating valid')
      if (userAlreadyRated) {
        console.log('user already rated')
        updateRating()
      } else {
        console.log('user hasnt yet rated')
        insertRating()
      }
    }
  }

  async function updateRating() {
    setAddRatingStatus('Updating Rating')
    const { error } = await supabase
      .from('ratings')
      .update({
        comment: comment,
        rating: rating
      })
      .match({submitter_name: props.username})
    if (error) {
      console.log('error updating comment')
    } else {
      setAddRatingStatus('Updated your comments and rating')
    }
  }

  async function insertRating() {
    setAddRatingStatus('Adding your rating')
    const {  error } = await supabase
      .from('ratings')
      .insert(
        { user_id: props.user.id,
          version_id: props.version.id,
          submitter_name: props.username,
          rating: rating,
          comment: comment,
        }, {returning: 'minimal'})
      if (error) {
        console.log('error adding rating: ', error)
      } else {
        setAddRatingStatus('Added your rating. Thanks for contributing!')
        props.addOnePoint(props.version.submitter_name)
        props.addOnePoint(props.songData.submitter_name)
        props.addTenPoints(props.username)
        props.addRatingCountToSong(props.songData.id)
        props.addRatingCountToArtist(props.artist.id)
        props.calcAverageForVersion(props.version.id)
        console.log('success adding rating. now time to add update average')
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
        className="inputField"
        placeholder=""
        value={rating}
        disabled={userAlreadyRated}
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
        <label htmlFor="comment">Comments (optional): </label>
        <br></br>
        <textarea
        type="text-area"
        name="comment"
        className="inputField"
        placeholder="Face = melted"
        cols="40"
        rows="10"
        value={comment}
        onChange={e => setComment(e.target.value)}></textarea>
        {(charCount > 9000) &&
        <p>{10000 - charCount} characters left</p>}
        <br></br>
        <br></br>
        <button className="primary-button"
        onClick={e => testRating()}
        disabled={loading}>{submitRatingButtonText}</button>
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