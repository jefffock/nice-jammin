import { useState, useEffect } from 'react'
import Account from './Account'
import Ideas from './Ideas'
import Support from './Support'
import BugReport from './BugReport'

function Menu (props) {

  const [showAccount, setShowAccount] = useState(false)
  const [showIdeas, setShowIdeas] = useState(false)
  const [showBugReport, setShowBugReport] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [ideasButtonClasses, setIdeasButtonClasses] = useState(props.buttonClassesEmpty)
  const [accountButtonClasses, setAccountButtonClasses] = useState(props.buttonClassesEmpty)
  const [bugReportButtonClasses, setBugReportButtonClasses] = useState(props.buttonClassesEmpty)
  const [supportButtonClasses, setSupportButtonClasses] = useState(props.buttonClassesEmpty)


  useEffect(() => {
   if (!props.showMenu) {
      setShowAccount(false)
      setShowIdeas(false)
      setShowBugReport(false)
      setShowSupport(false)
    }  if (showIdeas) {
      setIdeasButtonClasses(props.buttonClassesFull)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setBugReportButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
    } if (showAccount) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesFull)
      setBugReportButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
    } if (showBugReport) {
      setBugReportButtonClasses(props.buttonClassesFull)
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesEmpty)
    } if (showSupport) {
      setIdeasButtonClasses(props.buttonClassesEmpty)
      setSupportButtonClasses(props.buttonClassesFull)
      setAccountButtonClasses(props.buttonClassesEmpty)
      setBugReportButtonClasses(props.buttonClassesEmpty)
    }
  }, [props.showMenu, showIdeas, showAccount, showBugReport, showSupport, props.buttonClassesFull, props.buttonClassesEmpty])

  return (
    <>
        {props.showMenu &&
          <>
          <div className="bottom-row">
          <button className={ideasButtonClasses}
          onClick={e => {props.goHome();
            setShowAccount(false);
            setShowBugReport(false);
            setShowSupport(false);
            setShowIdeas(true);
          }}>Ideas</button>

          {props.session &&
          <button className={accountButtonClasses}
          onClick={e => {props.goHome();
            setShowIdeas(false);
            setShowBugReport(false);
            setShowSupport(false);
            setShowAccount(true)}}>Account</button>}

          <button className={supportButtonClasses}
          onClick={e => {props.goHome();
            setShowIdeas(false);
            setShowBugReport(false);
            setShowAccount(false);
            setShowSupport(true)}}>Support</button>

          <button className={bugReportButtonClasses}
          onClick={e => {props.goHome();
            setShowIdeas(false);
            setShowAccount(false);
            setShowSupport(false);
            setShowBugReport(true)}}>Report a bug</button>

            <br></br>

        {props.session &&
        <button className="header-button small-button"
        onClick={e => props.signOut()}>Log&nbsp;Out</button>}
          <br></br>
          <br></br>
          </div>
        </>}
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
        {props.showMenu && showBugReport &&
        <BugReport />}
        {props.showMenu && showSupport &&
        <Support />}
      </>
  )
}

export default Menu