import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showCreateAccount, setShowCreateAccount] = useState(false)

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

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        {!showCreateAccount &&
        <>
        <h2 className="header">Sign In</h2>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
           <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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
        <p>Don't have an account yet?</p>
        <button onClick={e => setShowCreateAccount(true)}>Create an account</button>
        </>
        }
        {showCreateAccount &&
        <p>Create an account</p>}
      </div>
    </div>
  )
}