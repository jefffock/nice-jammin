import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Review from './review'

function Reviews(props) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    console.log('props', props)
    if (props.reviews) {
      setReviews(props.reviews)
    }
  }, [props])

  return (
    <div>
      <br></br>
      <h3>Reviews</h3>
      <button onClick={e => props.setShowAddReview(true)}>Review {props.song} from {props.date}</button>
      {props.reviews && (props.reviews.length === 0) &&
      <p>No reviews yet!</p>}
      {props.reviews && (props.reviews.length > 0) &&
      <>
        <p>Review, Rating, User, Helpful, Funny</p>
        {props.reviews &&
        props.reviews.map(review => {
          if (review.review) {
            return (
              <Review data={review} />
            )
          } return (
            <div></div>
          )
        })}
      </>
      }
    </div>
  )
}

export default Reviews