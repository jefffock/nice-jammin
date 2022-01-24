import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth(props) {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showCreateAccount, setShowCreateAccount] = useState(true)

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithEmail(email, password) {
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })
  }

  async function signUpWithEmail(email, password, username) {
    console.log(`in sign up. email: ${email}, pw: ${password}, username: ${username}`)
    const { user, error } = await supabase.auth.signUp({
      // username: username,
      email: email,
      password: password,
    })
    if (error) {
      console.log('error', error)
      return (
        <p>Error: {error}</p>
      )
    } else {
      console.log('successful creation', user)
      return (
        <p>Successfully created account! Check your email to confirm sign up</p>
      )
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
          <label htmlFor="username">Username: </label>
          <input
            className="inputField"
            type="username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <br></br>
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
            signUpWithEmail(email, password, username)
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