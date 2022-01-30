import { useEffect } from 'react'
import Review from './review'

function Reviews(props) {

  useEffect(() => {
    console.log('props in reviews', props)
  }, [props])

  return (
    <div className="reviews">
      <button className="primary-button"
      onClick={e => props.setShowAddRating(true)}
      >Rate {props.songData.song} from {props.date}</button>
      <br></br>
      <br></br>
      {props.reviews && (props.reviews.length === 0) &&
      <p>No reviews yet!</p>}
      <br></br>
      {props.reviews && (props.reviews.length > 0) &&
      props.reviews.map(review => {
          if (review.comment) {
            return (
              <Review data={review} />
            )
          } return <></>
        })}
    </div>
  )
}

export default Reviews