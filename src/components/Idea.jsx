import { useState, useEffect } from 'react'
import { supabase } from './../supabaseClient'

function Idea(props) {

  useEffect(() => {
    console.log('props in idea', props)
  })

  const [helpfulToShow, setHelpfulToShow] = useState(props.ideaData.votes)

  async function checkAlreadyVotedHelpful() {
    console.log('in check already voted')
    if (props.username && (props.ideaData.user_name !== props.username)) {
      const { data, error } = await supabase
        .from('helpful_votes_ideas')
        .select('*')
        .eq('idea_id', props.ideaData.id)
        .eq('user_name', props.username)
      if (error) {
        console.log('error checking already voted helpful', error)
      } else {
        console.log('data checking voted', data)
        if (data.length === 0) {
          props.addOnePoint(props.ideaData.user_name)
          voteHelpful()
        }
      }
    }
  }

  async function voteHelpful() {
    console.log('in vote helpful')
    const { error } = await supabase
      .from('helpful_votes_ideas')
      .insert({ idea_id: props.ideaData.id, user_name: props.username })
    if (error) {
      console.log('error voting helpful', error)
    } else {
      let current = helpfulToShow
      setHelpfulToShow(current + 1)
      props.countHelpfulVotesIdeas(props.ideaData.id)
      console.log('just voted, now going to add a point to props.ideaData.user_name', props.ideaData.user_name)
    }
  }

  return (
    <>
    <div className="idea-container">
      <div className="idea-wrapper">
      <p className="idea-body">{props.ideaData.idea_body}</p>
      <p className="idea-name">{props.ideaData.user_name}</p>
      <p className="idea-votes link"
      onClick={e => checkAlreadyVotedHelpful()}>Support: {helpfulToShow}</p>
      </div>
    </div>
    <br></br>
    </>
  )
}

export default Idea