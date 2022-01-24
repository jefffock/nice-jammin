import MainSongEntry from './MainSongEntry'


var SongList = (props) => {
  return (
    <div id="main-song-list-container" >
      <div id="main-song-list-column-headings">
        <h3 class="col-1">Song Name</h3>
        <h3 class="col-2">Average Rating</h3>
        <h3 class="col-3">Versions Rated</h3>
        <h3 class="col-4">Popular Tags</h3>
      </div>
      {props.songs.map(song => (
        <MainSongEntry
          name={song.name}
          overallRating={song.overallRating}
          quantityOfVersions={song.quantityOfVersions}
          tags={song.tags} />
      ))};
    </div>
  )
}

export default SongList