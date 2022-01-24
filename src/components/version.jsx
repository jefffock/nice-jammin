import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function Version(props) {


  useEffect(() => {
    console.log('props in Version', props)
  })

  function handleClick() {
    let version = {
      id: props.id,
      date: props.date
    }
    props.handleVersionChange(version)
  }

  if (props) {
  return (
    <div className="version-div">
      <p onClick={e => handleClick()}>{props.date}, {props.avg}, {props.num}</p>
      </div>
  )
  }
}

export default Version