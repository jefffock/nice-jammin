import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'
import Version from './version'

function Versions(props) {

  useEffect(() => {
    console.log('props.versions', props.versions)
  })

  return (
    <>
      <h3>Versions</h3>
      {props.versions.length === 0 &&
      <p>No versions submitted yet!</p>}
      <button className="primary-button"
      onClick={e => props.setShowAddVersion(true)}>Add A Great Version</button>
      {props.versions.length > 0 &&
      <>
        <p>Choose a Date:</p>
        <div className="versions">
          <p className="version-col1">Date</p>
          <p className="version-col2">Average</p>
          <p className="version-col3">Tags</p>
          <p className="version-col4">Added by</p>
          <div className="line"></div>
          {props.versions &&
          props.versions.map((data) => {
            return (
                <Version data={data}
                handleVersionChange={props.handleVersionChange}/>)
          })}
        </div>
      </>
      }
    </>
  )
}

export default Versions