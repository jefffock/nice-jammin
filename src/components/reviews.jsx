import { useEffect } from 'react'
import Review from './review'
import { useParams, Link, Outlet } from 'react-router-dom'


function Reviews({ reviews, fetchRatings, artists, artist, setArtist, songs, song, setSong,
versions, version, setVersion, username, countHelpfulVotesRatings, countFunnyVotesRatings, addOnePoint}) {

  let { artistId, songId, versionId } = useParams()
  let params = useParams()

  // useEffect(() => {
  //   console.log('props in reviews', props.reviews, props)
  // if (!props) {
  //   console.log('no props, going to fetch reviews')
  // }
  // })

  useEffect(() => {
    if (artists) {
      let correctArtist = (artist) => JSON.stringify(artist.id) === artistId
      let index = artists.findIndex(correctArtist)
      console.log('artist at index', artists[index])
      setArtist(artists[index])
    }
  }, [artists, setArtist, artistId])

  useEffect(() => {
    if (songs && songId) {
      let correctSong = (song) => JSON.stringify(song.id) === songId
      let index = songs.findIndex(correctSong)
      setSong(songs[index])
    }
  }, [songs, songId, setSong])

  useEffect(() => {
    if (versions) {
      let correctVersion = (version) => JSON.stringify(version.id) === versionId
      let index = versions.findIndex(correctVersion)
      setVersion(versions[index])
    }
  })

  return (
    <>
    <Outlet />
    <div className="reviews">
      <br></br>
      {reviews && (reviews.length === 0) &&
      <h3 className="center-text">No reviews yet. Will you do the honors?</h3>}
      <br></br>
      {reviews && (reviews.length > 0) &&
      reviews.map((review, index) => {
          if (review.comment) {
            return (
              <Review data={review} username={username}
              countHelpfulVotesRatings={countHelpfulVotesRatings}
              countFunnyVotesRatings={countFunnyVotesRatings}
              addOnePoint={addOnePoint} key={index}/>
            )
          } return <></>
        })}
    </div>
    </>
  )
}

export default Reviews