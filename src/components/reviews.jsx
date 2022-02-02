import { useEffect } from 'react'
import Review from './review'

function Reviews(props) {

  useEffect(() => {
    console.log('props in reviews', props)
  }, [props])

  return (
    <div className="reviews">
      <br></br>
      {props.reviews && (props.reviews.length === 0) &&
      <p>No reviews yet!</p>}
      <br></br>
      {props.reviews && (props.reviews.length > 0) &&
      props.reviews.map(review => {
          if (review.comment) {
            return (
              <Review data={review} username={props.username}/>
            )
          } return <></>
        })}
    </div>
  )
}

export default Reviews