import { useState, useEffect } from 'react'
import Menu from './Menu'
import Account from './Account'
import Ideas from './Ideas'


function Header(props) {

  const [showAccount, setShowAccount] = useState(false)
  const [showIdeas, setShowIdeas] = useState(false)
  const [menuButtonClasses, setMenuButtonClasses] = useState('header-button small-button')
  const [ideasButtonClasses, setIdeasButtonClasses] = useState('header-button small-button')
  const [accountButtonClasses, setAccountButtonClasses] = useState('header-button small-button')



  useEffect(() => {
    if (props.showMenu) {
      setMenuButtonClasses('header-button small-button-full')
      if (!showIdeas && !showAccount) {
        setShowIdeas(true)
      }
    } if (!props.showMenu) {
      setMenuButtonClasses('header-button small-button')
      setShowAccount(false)
      setShowIdeas(false)
    }  if (showIdeas) {
      setIdeasButtonClasses('header-button small-button-full')
    } if (!showIdeas) {
      setIdeasButtonClasses('header-button small-button')
    } if (showAccount) {
      setAccountButtonClasses('header-button small-button-full')
    } if (!showAccount) {
      setAccountButtonClasses('header-button small-button')
    }
  }, [props.showMenu, showIdeas, showAccount])

  return (
    <div>
      <div className="header top-row">
        <h1 className="title" onClick={e => props.goHome()}>Nice Jammin</h1>

        {!props.session && !props.showPleaseConfirm &&
        <button className="header-button small-button"
        onClick={e => props.setShowSignIn(true)}>Create an Account or Sign In</button>}

        {props.session &&
        <button className={menuButtonClasses}
        onClick={e => { props.goHome(); props.setShowMenu(!props.showMenu)}}>Menu</button>}

        {props.session &&
        <button className="header-button small-button"
        onClick={e => props.signOut()}>Log&nbsp;Out</button>}

      </div>
      <br></br>
      <br></br>
      <div className="bottom-row">
        {props.showMenu &&
        <>
          <button className={ideasButtonClasses}
          onClick={e => {props.goHome();
          setShowIdeas(true);
          setShowAccount(false)}}>Ideas</button>

          <button className={accountButtonClasses}
          onClick={e => {props.goHome();
          setShowIdeas(false);
          setShowAccount(true)}}>Account</button>
          <br></br>
          <br></br>
        </>}
        <Menu />
        {props.showMenu && showAccount &&
        <Account key={props.session.user.id}
        session={props.session}
        username={props.username}
        points={props.points}
        avatar={props.avatar_url}
        user={props.user}
        fetchProfile={props.fetchProfile}/>}
        {props.showMenu && showIdeas &&
        <Ideas />}
        {!props.showMenu && !showAccount && !showIdeas &&
        <h3 className="subheading">Discover and share great jams</h3>
        }
        {props.showPleaseConfirm &&
        <h3>Welcome! Please confirm your email address to start contributing. Thank you!</h3>}
      </div>
    </div>
  )
}

export default Header