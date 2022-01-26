import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'
import Avatar from './Avatar'

export default function Account(props) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [points, setPoints] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [props.session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`name, avatar_url, points`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.name)
        setPoints(data.points)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        name: username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div>
      <h2>Welcome, {username}</h2>
    </div>
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={props.session.user.email} disabled />
      </div>
      <br></br>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br></br>
      <Avatar
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, avatar_url: url })
      }}
    />
    <br></br>
    <br></br>
    <br></br>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update Profile'}
        </button>
      </div>
    </div>
    </>
  )
}