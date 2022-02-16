import { useState, useEffect } from 'react'
import Account from './Account'
import Ideas from './Ideas'
import About from './About'
import Leaderboard from './Leaderboard'

function Menu (props) {

  const [leadersButtonClasses, setLeadersButtonClasses] = useState(props.buttonClassesEmpty)
  const [ideasButtonClasses, setIdeasButtonClasses] = useState(props.buttonClassesEmpty)
  const [accountButtonClasses, setAccountButtonClasses] = useState(props.buttonClassesEmpty)
  const [supportButtonClasses, setSupportButtonClasses] = useState(props.buttonClassesEmpty)


  useEffect(() => {
   if (!props.showMenu) {
      props.setShowAccount(false)
      props.setShowIdeas(false)
      props.setShowSupport(false)
      props.setShowLeaders(false)
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesEmpty)
   } if (!props.showAccount && !props.showIdeas && !props.showSupport && !props.showLeaders) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesEmpty)
    } if (props.showIdeas) {
      setIdeasButtonClasses(props.buttonClassesFull)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesEmpty)
    } else if (props.showAccount) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesFull)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesEmpty)
    } else if (props.showSupport) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesFull)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesEmpty)
    } else if (props.showLeaders) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesFull)
    } else {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setLeadersButtonClasses(props.buttonClassesEmpty)
    }
  }, [props])

  return (
    <>
        {props.showMenu &&
          <>
          <div className="header-bottom-row">
          <button className={leadersButtonClasses}
          onClick={e => {props.setShowAccount(false);
            props.setShowSupport(false);
            props.setShowIdeas(false);
            props.setShowLeaders(!props.showLeaders)
          }}>Top Contributors</button>

          <button className={ideasButtonClasses}
          onClick={e => {props.setShowAccount(false);
            props.setShowSupport(false);
            props.setShowLeaders(false);
            props.setShowIdeas(!props.showIdeas);
          }}>Ideas</button>

          {props.session &&
          <button className={accountButtonClasses}
          onClick={e => {props.setShowIdeas(false);
            props.setShowSupport(false);
            props.setShowLeaders(false);
            props.setShowAccount(!props.showAccount)}}>Account</button>}

          <button className={supportButtonClasses}
          onClick={e => {props.setShowIdeas(false);
            props.setShowAccount(false);
            props.setShowLeaders(false);
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
        setShowSupport={props.setShowSupport}
        canWrite={props.canWrite}
        countHelpfulVotesIdeas={props.countHelpfulVotesIdeas}
        addTenPoints={props.addTenPoints}
        addOnePoint={props.addOnePoint}/>}

        {/* {props.showMenu && props.showSupport &&
        <Support />} */}

        {props.showMenu && props.showLeaders &&
        <Leaderboard leaders={props.leaders} fetchLeaders={props.fetchLeaders} />}
      </>
  )
}

export default Menu