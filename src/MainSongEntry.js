var MainSongEntry = (props) => {
  return (
    <div class="main-song-entry">
      <div class="main-name">
        <p>{props.name}</p>
      </div>
      <div class="main-rating">
        <p>{props.overallRating}</p>
      </div>
      <div class="main-quantity">
        <p>{props.quantityOfVersions}</p>
      </div>
      <div class="main-tags">
        {props.tags.map(tag => (
          <p class="main-tag">{tag}</p>
        ))}
      </div>
    </div>
  )
}

export default MainSongEntry