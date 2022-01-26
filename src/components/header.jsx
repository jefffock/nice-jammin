import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function Header(props) {

  useEffect(() => {
    console.log('props in Header')
  })

  return (
    <div className="header">
      <h1 className="title">Nice Jammin</h1>
      {!props.session && !props.showPleaseConfirm &&
      <button className="header-button small-button"
      onClick={e => props.setShowSignIn(true)}>Create an Account or Sign In</button>}
      {props.session && !props.showProfile &&
      <button className="header-button small-button"
      onClick={e => props.setShowProfile(true)}>View Profile</button>}
      {props.session && props.showProfile &&
      <button className="header-button small-button"
      onClick={e => props.setShowProfile(false)}>Back to the Music</button>}
      {props.session &&
      <button className="header-button small-button"
      onClick={e => {props.signOut()}}>Log Out</button>}
      {props.showPleaseConfirm &&
      <h3>Please confirm your email address to start contributing. Thank you!</h3>}
    </div>
  )
}

export default Header