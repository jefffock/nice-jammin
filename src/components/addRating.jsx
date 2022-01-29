import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'

function AddRating(props) {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [userAlreadyRated, setUserAlreadyRated] = useState(false)
  const [submitRatingButtonText, setSubmitRatingButtonText] = useState('Add your rating')
  const [addRatingStatus, setAddRatingStatus] = useState('')

  useEffect(() => {
    console.log('props in add review', props)
    checkUserAlreadyRated()
  }, [props])

  useEffect(() => {
    setCharCount(comment.length)
  }, [comment])

  async function testRating() {
    setLoading(true)
    setAddRatingStatus('Checking your rating')
    console.log('rating:', rating, 'comment', comment)
    if (charCount > 10000) {
      alert(`Your enthusiasm is commendable! Also, character limit exceeded`)
      setAddRatingStatus('')
    } else {
      if (userAlreadyRated) {
        updateRating()
      } else {
        insertRating()
      }
    }
  }

  async function checkUserAlreadyRated() {
    let id = props.user.id
    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .eq('rating_submitter_user_id', id)
      .eq('version_id', props.version.id)
    if (error) {
      console.log('error in checkUserAlreadyRated', error)
    } else {
      console.log('data in check user already rated', data)
      if (data.length > 0) {
        setComment(data[0].comment)
        setRating(data[0].rating)
        setUserAlreadyRated(true)
        setSubmitRatingButtonText('Update your rating')
        console.log('we have data')
      }
    }
  }

  async function updateRating() {
    setAddRatingStatus('Updating Rating')
    const { data, error } = await supabase
      .from('ratings')
      .update({
        rating: rating,
        comment: comment
      })
      .match({rating_submitter_user_id: props.user.id})
    if (error) {
      console.log('error updating rating')
    } else {
      setAddRatingStatus('Updated rating')
    }
  }

  async function insertRating() {
    setAddRatingStatus('Adding your rating')
    const { data, error } = await supabase
      .from('ratings')
      .insert(
        {
          version_id: props.version.id,
          rating_submitter_user_id: props.user.id,
          song_submitter_user_id: props.songData.user_id,
          rating: rating,
          version_date: props.date,
          comment: comment,
          profiles_username: props.username
        }, {returning: 'minimal'})
      if (error) {
        console.log('error adding rating: ', error)
      } else {
        console.log('success adding rating. now time to add update average')
      }
  }

  function handleBackClick() {
    props.fetchRatings(props.songData.id)
    props.setShowAddRating(false)
  }

  return (
    <div>
      <h2>Add Rating</h2>
        <label htmlFor="rating">Rating: </label>
        <select
        name="rating"
        id="rating"
        className="inputField"
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
        <label htmlFor="review">Comments (optional): </label>
        <br></br>
        <textarea
        type="text-area"
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
        {showSuccessMessage &&
        <p>Added your rating to the {props.date} version of {props.song}. Thank you for contributing!</p>}
        <br></br>
        <br></br>
      <button className="small-button" onClick={e => handleBackClick()}>Back</button>
    </div>
  )
}

export default AddRating