import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'

function AddReview(props) {

  return (
    <div>
      <h1>Add Review</h1>
      <button onClick={e => props.setShowAddReview(false)}>Cancel</button>
    </div>
  )
}

export default AddReview