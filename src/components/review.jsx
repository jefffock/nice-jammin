import { useEffect, useState } from 'react'
import { supabase } from './../supabaseClient'

function Review(props) {

  const [helpfulToShow, setHelpfulToShow] = useState(props.data.helpful)
  const [funnyToShow, setFunnyToShow] = useState(props.data.funny)

  useEffect(() => {
    console.log('props in review', props)
  })

  async function checkAlreadyVotedHelpful() {
    if (props.username) {
      const { data, error } = await supabase
        .from('helpful_votes_ratings')
        .select('*')
        .eq('rating_id', props.data.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted helpful', error)
      } else {
        console.log('data checking voted', data)
        if (data.length === 0) {
          voteHelpful()
        }
      }
    }
  }

  async function voteHelpful() {
    console.log('in vote helpful')
    const { data, error } = await supabase
      .from('helpful_votes_ratings')
      .insert({ rating_id: props.data.id, user_name: props.username })
    if (error) {
      console.log('error voting helpful', error)
    } else {
      let current = helpfulToShow
      console.log('current', current)
      setHelpfulToShow(current + 1)
      console.log('data voting helpful', data)
      props.countHelpfulVotesRatings(props.data.id)
    }
  }

  async function checkAlreadyVotedFunny() {
      const { data, error } = await supabase
        .from('funny_votes_ratings')
        .select('*')
        .eq('rating_id', props.data.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted funny', error)
      } else {
        console.log('data checking voted', data)
        if (data.length === 0) {
          voteFunny()
        }
      }
  }

  async function voteFunny() {
    console.log('in vote funny')
    console.log('in vote funny')
    const { data, error } = await supabase
      .from('funny_votes_ratings')
      .insert({ rating_id: props.data.id, user_name: props.username })
    if (error) {
      console.log('error voting funny', error)
    } else {
      setFunnyToShow(funnyToShow + 1)
      console.log('data voting funny', data)
      props.countFunnyVotesRatings(props.data.id)
    }

  }

  return (
    <div className="review">
      <div className="review-comment">
      <span>{props.data.comment}</span>
      </div>
      <div className="review-container">
        <p className="review-rating">Rating: {props.data.rating}</p>
        <p className="review-username">{props.data.submitter_name}</p>
        <p className="review-helpful link"
        onClick={e => checkAlreadyVotedHelpful()}>Helpful? {helpfulToShow}</p>
        <p className="review-funny link"
        onClick={e => checkAlreadyVotedFunny()}>Funny? {funnyToShow}</p>
      </div>
    </div>
  )
}

export default Review