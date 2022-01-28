import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function Header(props) {

  return (
    <div>
      <div className="header top-row">
        <h1 className="title" onClick={e => props.goHome()}>Nice Jammin</h1>

        {!props.session && !props.showPleaseConfirm &&
        <button className="header-button small-button"
        onClick={e => props.setShowSignIn(true)}>Create an Account or Sign In</button>}

        {props.session && !props.showProfile &&
        <button className="header-button small-button"
        onClick={e => props.setShowProfile(true)}>View Menu</button>}

        {props.session && props.showProfile &&
        <button className="header-button small-button"
        onClick={e => props.setShowProfile(false)}>Back to the Music</button>}

        {props.session &&
        <button className="header-button small-button"
        onClick={e => props.signOut()}>Log Out</button>}

      </div>
      <br></br>
      <div className="bottom-row">
        <h3>Discover great jams</h3>
        {props.showPleaseConfirm &&
        <h3>Welcome! Please confirm your email address to start contributing. Thank you!</h3>}
      </div>
    </div>
  )
}

export default Header