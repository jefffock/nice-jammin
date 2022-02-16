import { useEffect } from 'react'

export default function Account(props) {

  useEffect(() => {
    if (!props.username) {
      props.fetchProfile()
    }
  })

  return (
    <>
    <div className="account-container">
      <div className="account-wrapper">
      <h2>hi, {props.username}!</h2>
      <h3>contributor score: {props.points}</h3>
      <h3>thank you!</h3>
      </div>
    </div>
    </>
  )
}