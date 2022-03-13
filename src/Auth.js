import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Auth(props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [status, setStatus] = useState('')

  let navigate = useNavigate();

  useEffect(() => {
    if (displayName.length > 20) {
      setStatus('maximum username length: 20 characters')
    } else {
      setStatus('')
    }
  }, [displayName])

  async function signInWithEmail(email, password) {
    setLoading(true)
    const {error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })
    if (error) {
      setLoading(false)
      setStatus(error.error_description || error.message)
    } else {
      setLoading(false)
      navigate('/')
    }
  }

  async function signUpWithEmail(email, password, displayName) {
    setLoading(true)
    let valid = true;
    setStatus('Creating your account')
    if (displayName.length < 1) {
      valid = false;
      setStatus('although a blank username would be super cool, it needs to be at least 1 character. Thank you for understanding.')
      setLoading(false)
    }
    if (displayName.length > 20) {
      valid = false;
      setStatus('maximum username length: 20 characters')
      setLoading(false)
    } if (valid) {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('name', displayName)
      if (error) {
        console.log(error)
        setLoading(false)
        setStatus('something went wrong, sorry about that! please refresh the page and try again')
      }
      if (data.length > 0) {
        setStatus('someone else already has that username. please choose another.')
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
          createProfile(displayName, user)
          props.setSession(session)
          setLoading(false)
        }
      }
    }
  }

  function showPassword() {
    let passwordBox = document.getElementById('password')
    if (passwordBox.type === 'password') {
      passwordBox.type = 'text'
    } else {
      passwordBox.type = 'password'
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

  // function handleBackClick () {
  //   navigate('/')
  // }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {props.showSignIn &&
        <>
        <h2 className="header">sign in</h2>
        <br></br>
        <div className="auth-fields-container">
          <div className="auth-fields-wrapper">
          <label htmlFor="email">email: </label>
          <br></br>
          <input
            className="inputField search-bar text"
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">password: </label>
          <br></br>
          <input
          className="inputField search-bar text"
          type="password"
          placeholder="your password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          /><br></br>
          <label htmlFor="showPass">show password: </label>
          <input type="checkbox" id="showPass"
          onClick={() => showPassword()}></input>
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
            {loading ? <span className="white">loading</span> : <span className="white">sign in</span>}
          </button>
          <p className="error-message">{status}</p>
        </div>
        <br></br>
        <br></br>
        <p className="link" onClick={() => navigate('/sign-up')}>create an account</p>
        <br></br>
        <br></br>
        {/* <p className="link" onClick={() => {handleBackClick()}}>Nevermind, I just want to browse</p> */}
        <br></br>
        </>
        }
        {props.showSignUp &&
        <>
        <h2>create an account</h2>
        <br></br>
        <div className="auth-fields-container">
          <div className="auth-fields-wrapper">
            <label htmlFor="email">email: </label><br></br>
          <input
            className="inputField search-bar text"
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">password: </label><br></br>
           <input
            className="inputField search-bar text"
            type="password" required
            placeholder="your password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          /><br></br>
          <label htmlFor="showPass">show password: </label>
          <input type="checkbox" id="showPass"
          onClick={() => showPassword()}></input>
          <br></br>
          <br></br>
          <label htmlFor="display-name">display name: </label><br></br>
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
          {loading ? <span className="white">loading</span> : <span className="white">create account</span>}
        </button>
        <br></br>
        <br></br>
        <p className="error-message">{status}</p>
        <br></br>
        <br></br>
        <div>
          <p className="link" onClick={() => navigate('/sign-in')}>i already have an account
          </p>
        </div>
        <br></br>
        </div>
        </>}
      </div>
    </div>
  )
}