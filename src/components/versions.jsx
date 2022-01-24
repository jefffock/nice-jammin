import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Version from './version'

function Versions(props) {

  useEffect(() => {
    console.log('props.versions', props.versions)
  })

  return (
    <div>
      <p>Date, Average Rating, Number of Ratings</p>
      {props.versions &&
      props.versions.map(({ date, avg_rating, num_reviews, id}) => {
        return (
          <Version date={date}
          avg={avg_rating}
          num={num_reviews}
          id={id}
          handleVersionChange={props.handleVersionChange}/>
        )
      })}
    </div>
  )
}

export default Versions