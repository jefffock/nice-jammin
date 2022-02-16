import { useState } from 'react'
import { supabase } from './../supabaseClient'

function Idea(props) {

  const [helpfulToShow, setHelpfulToShow] = useState(props.ideaData.votes)

  async function checkAlreadyVotedHelpful() {
    if (props.username && (props.ideaData.user_name !== props.username)) {
      const { data, error } = await supabase
        .from('helpful_votes_ideas')
        .select('*')
        .eq('idea_id', props.ideaData.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted helpful', error)
      } else {
        if (data.length === 0) {
          props.addOnePoint(props.ideaData.user_name)
          voteHelpful()
        }
      }
    }
  }

  async function voteHelpful() {
    const { error } = await supabase
      .from('helpful_votes_ideas')
      .insert({ idea_id: props.ideaData.id, user_name: props.username })
    if (error) {
      console.log('error voting helpful', error)
    } else {
      let current = helpfulToShow
      setHelpfulToShow(current + 1)
      props.countHelpfulVotesIdeas(props.ideaData.id)
    }
  }

  return (
    <>
    <div className="idea-container">
      <div className="idea-wrapper">
      <p className="idea-body">{props.ideaData.idea_body}</p>
      <p className="idea-name">{props.ideaData.user_name}</p>
      <p className="idea-votes link"
      onClick={() => checkAlreadyVotedHelpful()}>Support: {helpfulToShow}</p>
      </div>
    </div>
    <br></br>
    </>
  )
}

export default Idea