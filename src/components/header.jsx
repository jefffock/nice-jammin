import { useState, useEffect } from 'react'
import Menu from './Menu'

function Header(props) {

  const [menuButtonClasses, setMenuButtonClasses] = useState('header-button small-button')

  useEffect(() => {
    if (props.showMenu) {
      setMenuButtonClasses('header-button small-button-full')
    } if (!props.showMenu) {
      setMenuButtonClasses('header-button small-button')
    }
  }, [props.showMenu])

  return (
    <div>
      <div className="header top-row">
        <h1 className="title" onClick={e => props.goHome()}>Nice Jammin</h1>
        <div className="top-row-buttons">
          <button className={menuButtonClasses}
          onClick={e => {props.setShowMenu(!props.showMenu)}}>Menu</button>
          </div>
        </div>
        <br></br>
        <br></br>
        <h3 className="subheading">Discover and share great jams</h3>
        {!props.session && !props.showPleaseConfirm &&
          <>
          <button className="header-button small-button"
          onClick={e => props.setShowSignIn(true)}>Log&nbsp;In</button>
          </>}

          {!props.session && !props.showPleaseConfirm &&
          <>
          <button className="header-button small-button"
          onClick={e => props.setShowSignUp(true)}>Sign&nbsp;Up</button>
          <br></br>
          </>}
      <br></br>
      {props.showMenu &&
      <br></br>}
        <Menu
        showMenu={props.showMenu}
        session={props.session}
        username={props.username}
        points={props.points}
        avatar={props.avatar_url}
        user={props.user}
        fetchProfile={props.fetchProfile}
        goHome={props.goHome}
        buttonClassesEmpty={'header-button small-button'}
        buttonClassesFull={'header-button small-button-full'}
        signOut={props.signOut}
        setShowArtistPicker={props.setShowArtistPicker}/>
        {props.showPleaseConfirm &&
        <h3>Welcome! Please confirm your email address to start contributing. Thank you!</h3>}
    </div>
  )
}

export default Header