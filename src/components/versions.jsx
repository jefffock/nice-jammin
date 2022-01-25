import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Version from './version'

function Versions(props) {

  useEffect(() => {
    console.log('props.versions', props.versions)
  })

  return (
    <div className="versions">
      <div className="versions-header">
        <p>Date</p>
        <p>Rating</p>
        <p>#</p>
      </div>
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