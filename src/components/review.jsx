import { useEffect } from 'react'

function Review(props) {

  useEffect(() => {
    console.log('props in review', props)
  })

  return (
    <div>
      <div className="review-comment">
      <span>{props.data.comment}</span>
      </div>
      <div className="review-container">
        <p className="review-rating">Rating: {props.data.rating}</p>
        <p className="review-username">{props.data.profiles_username}</p>
        <p className="review-helpful link">Helpful? {props.data.helpful}</p>
        <p className="review-funny link">Funny? {props.data.funny}</p>
      </div>
      <div className="line"></div>
    </div>
  )
}

export default Review