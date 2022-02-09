import { useEffect } from 'react'
import LeaderboardCard from './LeaderboardCard'

function Leaderboard(props) {

useEffect(() => {
  if (!props.leaders) {
    props.fetchLeaders()
  } else {
    console.log('props.leaders', props.leaders)
  }
})

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-wrapper">
        <h1>Top Contributors</h1>
        {!props.leaders &&
        <h3>Loading Top Contributors</h3>}
        <div className="leaders-container">
        {props.leaders &&
        props.leaders.map((leader, index) => {
          return (
            <>
            <LeaderboardCard leader={leader} rank={index + 1} key={index} />
            </>
          )
        })}
        </div>
        <p>Thank you to all contributors!</p>
      </div>
    </div>
  )
}

export default Leaderboard