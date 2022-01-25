import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth(props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showCreateAccount, setShowCreateAccount] = useState(true)

  async function signInWithEmail(email, password) {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })
    if (error) {
      alert(error.error_description || error.message)
    } else {
    setLoading(false)
    props.handleShowSignIn(false)
    }
  }

  async function signUpWithEmail(email, password, displayName) {
    setLoading(true)
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) {
      alert(error.error_description || error.message)
    } else {
      console.log('in the else block, should close showSignIn')
      createProfile(displayName, user)
      props.handleShowSignIn(false)
      props.handleNotConfirmedYet()
    }
    setLoading(false)// <p>Successfully created account! Check your email to confirm sign up</p>
  }

  async function createProfile(displayName, user) {
    console.log('in create profile', displayName, 'user', user)
    const { data, error } = await supabase
      .from('profiles')
      .insert([
    { name: displayName, id: user.id }
    ])
    if (error) {
      alert (error)
    } else {
      console.log('successfully created user profile', data)
    }
  }

  function handleShowSignInClick(show) {
    props.handleShowSignIn(show)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        {!showCreateAccount &&
        <>
        <h2 className="header">Sign In</h2>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password: </label>
          <input
          className="inputField"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              signInWithEmail(email, password)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Sign In</span>}
          </button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <p className="link" onClick={e => setShowCreateAccount(true)}>Create an account</p>
        <p className="link" onClick={e => handleShowSignInClick(false)}>Nevermind, I just want to browse</p>
        </>
        }
        {showCreateAccount &&
        <>
        <h2>Create an account</h2>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password: </label>
           <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="display-name">Display name: </label>
           <input
            className="inputField"
            type="display-name"
            placeholder="TroyPistachio"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <br></br>
        <div>
          <button
          onClick={(e) => {
            e.preventDefault()
            signUpWithEmail(email, password, displayName)
          }}
          className={'button block'}
          disabled={loading}
        >
          {loading ? <span>Loading</span> : <span>Create Account</span>}
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <p className="link" onClick={e => setShowCreateAccount(false)}>I already have an account</p>
        </div>
        </div>
          <p className="link" onClick={e => handleShowSignInClick(false)}>Nevermind, I just want to browse</p>
        </>}
      </div>
    </div>
  )
}