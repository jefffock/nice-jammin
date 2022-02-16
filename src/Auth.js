import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Auth(props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [status, setStatus] = useState('')

  let navigate = useNavigate();

  async function signInWithEmail(email, password) {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })
    if (error) {
      setLoading(false)
      setStatus(error.error_description || error.message)
    } else {
      setLoading(false)
      props.setShowSignIn(false)
      props.setUser(user)
      props.fetchProfile()
      navigate('/')
    }
  }

  async function signUpWithEmail(email, password, displayName) {
    setLoading(true)
    let valid = true;
    setStatus('Creating your account')
    if (displayName.length < 1) {
      valid = false;
      setStatus('Although a blank username would be super cool, it needs to be at least 1 character. Thank you for understanding.')
      setLoading(false)
    }
    if (displayName.length > 20) {
      valid = false;
      setStatus('Maximum username length: 20 characters')
      setLoading(false)
    } if (valid) {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('name', displayName)
      if (error) {
        console.log(error)
        setLoading(false)
        setStatus('Something went wrong, sorry about that! Please refresh the page and try again')
      }
      if (data.length > 0) {
        setStatus('Great minds think alike! Someone else already has that username. Please choose another.')
        setLoading(false)
      } else {
        const { user, session, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        })
        if (error) {
          setStatus('Something went wrong signing up. Please refresh the page and try again')
          setLoading(false)
        } else {
          props.setEmailToConfirm(email)
          createProfile(displayName, user)
          props.setShowSignIn(false)
          props.setShowSignUp(false)
          props.handleNotConfirmedYet()
          props.setSession(session)
          setLoading(false)
        }
      }
    }
  }

  async function createProfile(displayName, user) {
    const { error } = await supabase
      .from('profiles')
      .insert([
    { name: displayName, id: user.id }
    ])
    if (error) {
      alert (error)
    } else {
      setLoading(false)
      setStatus(`Welcome, ${displayName}!
      Please check for an email from nicejammin@nicejammin.com.
      Once you confirm your account, you can start contributing!`)
    }
  }

  function handleBackClick () {
    navigate('/')
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {props.showSignIn &&
        <>
        <h2 className="header">Sign In</h2>
        <br></br>
        <div className="auth-fields-container">
          <div className="auth-fields-wrapper">
          <label htmlFor="email">Email: </label>
          <br></br>
          <input
            className="inputField search-bar text"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password: </label>
          <br></br>
          <input
          className="inputField search-bar text"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          </div>
        </div>
        <br></br>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              signInWithEmail(email, password)
            }}
            className='primary-button'
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Sign In</span>}
          </button>
          <p className="error-message">{status}</p>
        </div>
        <br></br>
        <br></br>
        <p className="link" onClick={() => navigate('/sign-up')}>Create an account</p>
        <br></br>
        <br></br>
        <p className="link" onClick={() => {handleBackClick()}}>Nevermind, I just want to browse</p>
        <br></br>
        </>
        }
        {props.showSignUp &&
        <>
        <h2>Create an account</h2>
        <br></br>
        <div className="auth-fields-container">
          <div className="auth-fields-wrapper">
            <label htmlFor="email">Email: </label><br></br>
          <input
            className="inputField search-bar text"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password: </label><br></br>
           <input
            className="inputField search-bar text"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="display-name">Display name: </label><br></br>
           <input
            className="inputField search-bar text"
            type="display-name"
            placeholder="TroyPistachio"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            />
            </div>
        </div>
        <br></br>
        <div>
          <button
          onClick={(e) => {
            e.preventDefault()
            signUpWithEmail(email, password, displayName)
          }}
          className='primary-button'
          disabled={loading}
        >
          {loading ? <span>Loading</span> : <span>Create Account</span>}
        </button>
        <br></br>
        <br></br>
        <p className="error-message">{status}</p>
        <br></br>
        <br></br>
        <div>
          <p className="link" onClick={() => navigate('/sign-in')}>I already have an account
          </p>
        </div>
        <br></br>
        <br></br>
        </div>
          <p className="link" onClick={() => handleBackClick()}>Nevermind, I just want to browse</p>
          <br></br>
        </>}
      </div>
    </div>
  )
}