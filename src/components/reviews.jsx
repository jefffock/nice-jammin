import { useEffect } from 'react'
import Review from './review'

function Reviews(props) {

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
              countFunnyVotesRatings={props.countFunnyVotesRatings}
              addOnePoint={props.addOnePoint}/>
            )
          } return <></>
        })}
    </div>
  )
}

export default Reviews