
import './index.css'
import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import './App.css';
import Versions from './components/versions'
import Reviews from './components/reviews'

function App() {
  const [session, setSession] = useState(null)
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState('Phish')
  const [songs, setSongs] = useState(null)
  const [song, setSong] = useState(null)
  const [versions, setVersions] = useState(null)
  const [version, setVersion] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const songRef = useRef();
  const versionsRef = useRef();

  handleVersionChange.bind(this)


  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    fetchSongs('Phish')
  }, [])

  async function fetchArtists() {
    const { data, error } = await supabase
      .from('artists')
      .select()
    setArtists(data)
  }

  async function fetchSongs(artist) {
    const { data, error } = await supabase
      .from('songs')
      .select('*, artists!inner(*)')
      .eq('artists.artist', artist)
    setSongs(data)
    console.log('songData', data)
  }

  async function fetchVersions(songId) {
    console.log('currentSong', songId)
    const { data, error } = await supabase
      .from('versions')
      .select('*, songs!inner(*)')
      .eq('songs.id', songId)
    setVersions(data)
    console.log('version data', data)
    versionsRef.current = data
    console.log('versionsRef', versionsRef)
  }

  async function fetchRatings(versionId) {
    const { data, error } = await supabase
      .from('ratings')
      .select('*, versions!inner(*)')
      .eq('versions.id', versionId)
    setReviews(data)
    console.log('review data', data)
  }

  function handleArtistChange(artist) {
    setArtist(artist);
    fetchSongs(artist);
    setSong(null);
    setVersions(null)
  }

  function handleSongChange(song) {
    console.log('song in handleSongChange', song)
    setVersions(null)
    setSong(song.song)
    fetchVersions(song.id)
    songRef.current = song.id
  }

  function handleVersionChange(version) {
    console.log('version in handle version change', version)
    setVersion(version)
    fetchRatings(version.id)
  }

  function handleShowSignIn(show) {
    setShowSignIn(show)
  }

  if (showSignIn) {
    return (
      <div className="app">
        <h1>Nice Jammin</h1>
        <Auth handleShowSignIn={handleShowSignIn}/>
      </div>
    )
  }
  return (
    <>
      <div className="app">
        <div className="header">
          <h1 className="title">Nice Jammin</h1>
          {!session &&
          <button className="sign-in-button small-button"
          onClick={e => {setShowSignIn(true)}}>Create an Account or Sign In</button>}
          {session &&
          <button className="sign-in-button small-button">View Profile</button>}
        </div>
        <div className="current-selection-div">
          <h2>{artist}</h2>
          <h2>{song}</h2>
          {version &&
          <h2>{version.date}</h2>
          }
        </div>
        {!artist &&
          artists.map(artist => {
            return (
              <button onClick={() => handleArtistChange(artist.artist)}>{artist.artist}</button>
            )
          })}
        <div className="back-buttons-div">
          {artist &&
          <>
          <button className="back small-button" onClick={e => {
            setArtist(null);
            setSong(null);
            setVersion(null)}}>Change Artist</button>
            <br></br>
          </>}
          {song &&
          <>
          <button className="back small-button" onClick={e => {
            setSong(null);
            setVersion(null)}}>Change Song</button>
            <br></br>
          </>}
          {version &&
          <>
          <button className="back small-button" onClick={e => {
            setVersion(null)}}>Change Version</button>
          </>}
        </div>
        {songs && !song && artist &&
        <p>Choose a song:</p>}
        {songs && !song && artist &&
        songs.map(song => {
          return (
            <button onClick={() => handleSongChange(song)}>{song.song}</button>
          )
        })}
        {songs && !song && artist &&
        <>
        <br></br>
        <br></br>
        <button className="small-button">Add a Song</button>
        </>}
        {song && versions && !version &&
        <>
        <h3>Versions</h3>
        <button className="small-button">Add A Great Version</button>
        <Versions versions={versions} handleVersionChange={handleVersionChange}/>
        </>
        }
        {version &&
        <Reviews reviews={reviews} song={song} date={version.date}/>}
        {/* <div className="container" style={{ padding: '50px 0 100px 0' }}>
          {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
        </div> */}
      </div>
    </>
  )
}


export default App;