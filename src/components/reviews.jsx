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
      <h3 className="center-text">No reviews yet. Will you do the honors?</h3>}
      <br></br>
      {props.reviews && (props.reviews.length > 0) &&
      props.reviews.map(review => {
          if (review.comment) {
            return (
              <Review data={review} username={props.username}
              countHelpfulVotesRatings={props.countHelpfulVotesRatings}
              countFunnyVotesRatings={props.countFunnyVotesRatings}/>
            )
          } return <></>
        })}
    </div>
  )
}

export default Reviews