function LeaderboardCard(props) {
  return (
    <div className="leaderboard-card">
      <h3 className="leader-name">{props.rank}. {props.leader.name}</h3>
      <h3 className="leader-points">{props.leader.points}</h3>
    </div>
  )
}

export default LeaderboardCard