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
    <>
    <div className="header-spacer"></div>
    <div className="header">
      <div className="header-and-subheading">
      <div className="header-top-row">
        <h1 className="title" onClick={e => props.goHome()}>Nice Jammin</h1>
        <div className="top-row-buttons">
          <button id="menu-button" className={menuButtonClasses} disabled={props.showPleaseConfirm}
          onClick={e => {props.setShowMenu(!props.showMenu)}}>Menu</button>
          </div>
        </div>
        <h3 className="subheading">Discover and share great jams</h3>
        </div>
        <br></br>
        <div className="log-in-out-buttons-div">
          {!props.session && !props.showPleaseConfirm &&
          <>
          <button className="header-button small-button-full"
          onClick={e => props.setShowSignUp(true)}>Sign&nbsp;Up</button>
          <br></br>
          </>}

        {!props.session && !props.showPleaseConfirm &&
          <>
          <button className="header-button small-button"
          onClick={e => props.setShowSignIn(true)}>Sign&nbsp;In</button>
          </>}

        </div>
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
        setShowArtistPicker={props.setShowArtistPicker}
        fetchIdeas={props.fetchIdeas}
        showIdeas={props.showIdeas}
        setShowIdeas={props.setShowIdeas}
        showSupport={props.showSupport}
        setShowSupport={props.setShowSupport}
        setShowAccount={props.setShowAccount}
        showAccount={props.showAccount}
        ideas={props.ideas}
        canWrite={props.canWrite}
        countHelpfulVotesIdeas={props.countHelpfulVotesIdeas}/>
        {props.showPleaseConfirm &&
        <>
        <div className="please-confirm">
          <h3>Welcome aboard!<br></br> <br></br>
          Please check {props.emailToConfirm} and click the link we sent start contributing!<br></br><br></br>
          Thank you!</h3>
        </div>
        </>}
    </div>
    </>
  )
}

export default Header