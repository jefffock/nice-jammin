import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Review from './review'

function Reviews(props) {

  useEffect(() => {
    // console.log('props', props)
  })

  return (
    <div>
      <br></br>
      <button>Review this {props.song}</button>
      <h3>Reviews</h3>
      <p>Review, Rating, User, Helpful, Funny</p>
      {props.reviews &&
      props.reviews.map(review => {
        if (review.review) {
          return (
            <Review data={review} />
          )
        }
      })}
    </div>
  )
}

export default Reviews