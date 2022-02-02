import { useState, useEffect } from 'react'
import Account from './Account'
import Ideas from './Ideas'
import Support from './Support'

function Menu (props) {

  const [ideasButtonClasses, setIdeasButtonClasses] = useState(props.buttonClassesEmpty)
  const [accountButtonClasses, setAccountButtonClasses] = useState(props.buttonClassesEmpty)
  const [supportButtonClasses, setSupportButtonClasses] = useState(props.buttonClassesEmpty)


  useEffect(() => {
   if (!props.showMenu) {
      props.setShowAccount(false)
      props.setShowIdeas(false)
      props.setShowSupport(false)
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
   } if (!props.showAccount && !props.showIdeas && !props.showSupport) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
    } if (props.showIdeas) {
      setIdeasButtonClasses(props.buttonClassesFull)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
    } else if (props.showAccount) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesFull)
      setSupportButtonClasses(props.buttonClassesEmpty)
    } else if (props.showSupport) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesFull)
      setAccountButtonClasses(props.buttonClassesEmpty)
    } else {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
    }
  }, [props])

  return (
    <>
        {props.showMenu &&
          <>
          <div className="header-bottom-row">
          <button className={ideasButtonClasses}
          onClick={e => {props.setShowAccount(false);
            props.setShowSupport(false);
            props.setShowIdeas(!props.showIdeas);
          }}>Ideas</button>

          {props.session &&
          <button className={accountButtonClasses}
          onClick={e => {props.setShowIdeas(false);
            props.setShowSupport(false);
            props.setShowAccount(!props.showAccount)}}>Account</button>}

          <button className={supportButtonClasses}
          onClick={e => {props.setShowIdeas(false);
            props.setShowAccount(false);
            props.setShowSupport(!props.showSupport)}}>Support</button>

            <br></br>

        {props.session &&
        <button className="header-button small-button"
        onClick={e => props.signOut()}>Log&nbsp;Out</button>}
          <br></br>
          <br></br>
          </div>
        </>}
        {props.showMenu && props.showAccount &&
        <Account key={props.session.user.id}
        session={props.session}
        username={props.username}
        points={props.points}
        avatar={props.avatar_url}
        user={props.user}
        fetchProfile={props.fetchProfile}/>}

        {props.showMenu && props.showIdeas &&
        <Ideas username={props.username}
        fetchIdeas={props.fetchIdeas}
        ideas={props.ideas}
        showIdeas={props.showIdeas}
        setShowIdeas={props.setShowIdeas}
        showBugReport={props.showBugReport}
        setShowBugReport={props.setShowBugReport}
        showSupport={props.showSupport}
        setShowSupport={props.setShowSupport}/>}
        {props.showMenu && props.showSupport &&
        <Support />}
      </>
  )
}

export default Menu