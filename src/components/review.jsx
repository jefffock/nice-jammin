import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function Review(props) {

  useEffect(() => {
    console.log('props in review', props)
  })

  return (
    <div className="review">
      <p>{props.data.review}, {props.data.rating}, {props.data.profiles_username}, {props.data.helpful}, {props.data.funny}</p>
    </div>
  )
}

export default Review