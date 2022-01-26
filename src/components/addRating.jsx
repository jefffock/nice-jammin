import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'

function AddRating(props) {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    setCharCount(comment.length)
  }, [comment])

  async function testRating() {
    setLoading(true)
    console.log('rating:', rating, 'comment', comment)
    if (charCount > 10000) {
      alert(`Your enthusiasm is commendable! Also, character limit exceeded`)
    } else {
      insertRating()
    }
  }

  async function insertRating() {
    const { data, error } = await supabase
      .from('')
  }

  function handleBackClick() {
    props.setShowAddRating(false)
    
  }

  return (
    <div>
      <h2>Add Rating</h2>
      <label htmlFor="artist">Artist: </label>
        <input
          className="inputField"
          type="artist"
          placeholder="Artist"
          value={props.artist}
        />
        <br></br>
        <br></br>
        <label htmlFor="song">Name: </label>
        <input
          className="inputField"
          type="song"
          placeholder="Song"
          value={props.song}
        />
        <br></br>
        <br></br>
        <label htmlFor="version">Date: </label>
        <input
        className="inputField"
        placeholder=""
        value={props.date}></input>
        <br></br>
        <br></br>
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
        <button
        onClick={e => testRating()}
        disabled={loading}>Add your rating</button>
        {showSuccessMessage &&
        <p>Added your rating to the {props.date} version of {props.song}. Thank you for contributing!</p>}
        <br></br>
      <button className="small-button" onClick={e => handleBackClick()}>Back</button>
    </div>
  )
}

export default AddRating