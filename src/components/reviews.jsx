import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Review from './review'

function Reviews(props) {
  const [reviews, setReviews] = useState([])
  const [sortedReviews, setSortedReviews] = useState([])
  const [sort, setSort] = useState('helpful')

  useEffect(() => {
    console.log('props in reviews', props)
    if (props.reviews) {
      setReviews(props.reviews)
      setSortedReviews(props.reviews)
    }
  }, [props])

  return (
    <div className="reviews">
      <br></br>
      <button className="primary-button" onClick={e => props.setShowAddRating(true)}>Rate {props.song} from {props.date}</button>
      <br></br>
      <br></br>
      <label htmlFor="review-sort">Sort comments by: </label>
      <select
      name="review-sort"
      id="review-sort"
      className="inputField"
      value={sort}
      onChange={e => setSort(e.target.value)}>
        <option value="helpful">Helpful</option>
        <option value="funny">Funny</option>
        <option value="created_at">Newest</option>
      </select>
      {props.reviews && (props.reviews.length === 0) &&
      <p>No reviews yet!</p>}
      {props.reviews && (props.reviews.length > 0) &&
      props.reviews.map(review => {
          if (review.comment) {
            return (
              <Review data={review} />
            )
          } return
        })}
    </div>
  )
}

export default Reviews