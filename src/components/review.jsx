import { useState } from 'react'
import { supabase } from './../supabaseClient'

function Review(props) {

  const [helpfulToShow, setHelpfulToShow] = useState(props.data.helpful)
  const [funnyToShow, setFunnyToShow] = useState(props.data.funny)

  async function checkAlreadyVotedHelpful() {
    if (props.username && props.username !== props.data.submitter_name) {
      const { data, error } = await supabase
        .from('helpful_votes_ratings')
        .select('*')
        .eq('rating_id', props.data.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted helpful', error)
      } else {
        if (data.length === 0) {
          props.addOnePoint(props.data.submitter_name)
          voteHelpful()
        }
      }
    }
  }

  async function voteHelpful() {
    const { error } = await supabase
      .from('helpful_votes_ratings')
      .insert({ rating_id: props.data.id, user_name: props.username })
    if (error) {
      console.log('error voting helpful', error)
    } else {
      let current = helpfulToShow
      setHelpfulToShow(current + 1)
      props.countHelpfulVotesRatings(props.data.id)
    }
  }

  async function checkAlreadyVotedFunny() {
    if (props.username && props.username !== props.data.submitter_name) {
      const { data, error } = await supabase
        .from('funny_votes_ratings')
        .select('*')
        .eq('rating_id', props.data.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted funny', error)
      } else {
        if (data.length === 0) {
          props.addOnePoint(props.data.submitter_name)
          voteFunny()
        }
      }
    }
  }

  async function voteFunny() {
    const { error } = await supabase
      .from('funny_votes_ratings')
      .insert({ rating_id: props.data.id, user_name: props.username })
    if (error) {
      console.log('error voting funny', error)
    } else {
      setFunnyToShow(funnyToShow + 1)
      props.countFunnyVotesRatings(props.data.id)
    }

  }

  return (
    <div className="review">
      <div className="review-comment">
      <span>{props.data.comment}</span>
      </div>
      <div className="review-container">
        <p className="review-rating">rating: {props.data.rating}</p>
        <p className="review-username">{props.data.submitter_name}</p>
        <p className="review-helpful link"
        onClick={e => checkAlreadyVotedHelpful()}>helpful? {helpfulToShow}</p>
        <p className="review-funny link"
        onClick={e => checkAlreadyVotedFunny()}>funny? {funnyToShow}</p>
      </div>
    </div>
  )
}

export default Review