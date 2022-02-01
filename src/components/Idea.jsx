
function Idea(props) {

  return (
    <>
    <div className="idea-item">
      <p className="idea-body">{props.ideaData.idea_body}</p>
      <p className="idea-name">{props.ideaData.user_name}</p>
      <p className="idea-votes">Helpful? {props.ideaData.votes}</p>
    </div>
    <div className="line"></div>
    {/* <br></br> */}
    <br></br>
    </>
  )
}

export default Idea