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
      <h2>Hi, {props.username}!</h2>
      <h3>Contributor score: {props.points}</h3>
      <h3>Thank you!</h3>
      </div>
    </div>
    </>
  )
}