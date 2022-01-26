import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'
import Avatar from './Avatar'

export default function Account(props) {
  const [loading, setLoading] = useState(false)
  const [newAvatarUrl, setNewAvatarUrl] = useState(props.avatar)

  useEffect(() => {
    console.log('props in account', props)
  })

  async function updateProfile() {
    console.log('props in account', props)
    setLoading(true)

    let { error } = await supabase
    .from('profiles')
    .update({avatar_url: newAvatarUrl,
      updated_at: new Date()})
    .match({id: props.user.id})
    if (error) {
      console.log(error)
    }
    setLoading(false)
    props.fetchProfile()
  }

  return (
    <>
    <div>
      <h2>Welcome, {props.username}</h2>
    </div>
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={props.session.user.email} disabled />
      </div>
      {/* <br></br>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={props.username}/>
      </div> */}
      <br></br>
      <Avatar
      url={newAvatarUrl}
      size={150}
      onUpload={(url) => {
        console.log('in on upload', url)
        setNewAvatarUrl(url)
        updateProfile()
      }}
    />
    <br></br>
    <br></br>
    <br></br>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update Profile'}
        </button>
      </div>
    </div>
    </>
  )
}