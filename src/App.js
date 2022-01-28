
import './index.css'
import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './components/Account'
import './App.css';
import Versions from './components/versions'
import Reviews from './components/reviews'
import AddSong from './components/addSong'
import AddVersion from './components/addVersion'
import AddRating from './components/addRating'
import Header from './components/header'

function App() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState(null)
  const [song, setSong] = useState(null)
  const [songData, setSongData] = useState(null)
  const [versions, setVersions] = useState(null)
  const [version, setVersion] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showPleaseConfirm, setShowPleaseConfirm] = useState(false)
  const [showAddSong, setShowAddSong] = useState(false)
  const [showAddVersion, setShowAddVersion] = useState(false)
  const [showAddRating, setShowAddRating] = useState(false)
  const [username, setUsername] = useState(null)
  const [points, setPoints] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const songRef = useRef();
  const versionsRef = useRef();

  handleVersionChange.bind(this)

  useEffect(() => {
    console.log('in the set session hook')
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log('in the set user hook')
    setUser(supabase.auth.user())
  }, [])

  useEffect(() => {
    if (user) {
      setShowPleaseConfirm(false)
    } fetchProfile()
  }, [session, user])

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    fetchSongs(artist)
  }, [artist])

  async function fetchProfile() {
    const user = supabase.auth.user()
    if (user) {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`name, avatar_url, points`)
        .eq('id', user.id)
        .single()
      if (error) {
        console.log('error getting profile')
      } if (data) {
        console.log('data in fetchProfile', data)
        setUsername(data.name)
        setPoints(data.points)
        setAvatarUrl(data.avatar_url)
      }
    }
  }

  async function fetchArtists() {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('ratings', {ascending: false})
    if (error) {
      console.log(error)
      alert(error)
    } else {
      setArtists(data)
    }
  }

  async function fetchSongs(artist) {
    if (artist) {
      const { data, error } = await supabase
        .from('songs')
        .select('*, artists!inner(*)')
        .eq('artists.artist', artist)
        .order('ratings', {ascending: false})
      setSongs(data)
      console.log('songData', data)
    }
  }

  async function fetchVersions(songId) {
    console.log('currentSong', songId)
    const { data, error } = await supabase
      .from('versions')
      .select('*, songs!inner(*)')
      .eq('songs.id', songId)
      .order('avg_rating', {ascending: false})
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
      .order('helpful', {ascending: false})
    setReviews(data)
    console.log('review data', data)
  }

  function handleArtistChange(artist) {
    console.log('session', session)
    setArtist(artist);
    fetchSongs(artist);
    setSong(null);
    setVersions(null)
  }

  function handleSongChange(song) {
    console.log('song in handleSongChange', song)
    setVersions(null)
    setSongData(song)
    setSong(song.song)
    fetchVersions(song.id)
    songRef.current = song.id
  }

  function handleVersionChange(version) {
    console.log('version in handle version change', version)
    setVersion(version)
    fetchRatings(version.id)
  }

  async function signOut() {
    setShowProfile(false)
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error)
    } else {
      console.log('signed out')
    }
  }

  function handleShowSignIn(show) {
    setShowSignIn(show)
  }

  function handleNotConfirmedYet() {
    setShowPleaseConfirm(true)
  }

  function goHome() {
    
  }

  if (showSignIn) {
    return (
      <div className="app">
        <h1>Nice Jammin</h1>
        <Auth handleShowSignIn={handleShowSignIn}
        handleNotConfirmedYet={handleNotConfirmedYet}
        setUser={setUser}/>
      </div>
    )
  } if (showProfile) {
    return (
      <div className="app">
       <Header session={session} showPleaseConfirm={showPleaseConfirm}
        setShowSignIn={setShowSignIn} setShowProfile={setShowProfile}
        signOut={signOut} showProfile={showProfile}/>
        <Account key={session.user.id}
        session={session}
        username={username}
        points={points}
        avatar={avatar_url}
        user={user}
        fetchProfile={fetchProfile}/>
      </div>
    )
  } return (
    <>
      <div className="app">
        <Header session={session} showPleaseConfirm={showPleaseConfirm}
        setShowSignIn={setShowSignIn} setShowProfile={setShowProfile}
        signOut={signOut} />
        {!artist &&
        <p>Choose an artist:</p>}
        {!artist && artists &&
          artists.map(artist => {
            return (
              <button className="button-in-list" onClick={() => handleArtistChange(artist.artist)}>{artist.artist}</button>
            )
          })}
        <div className="back-buttons-div">
          {artist && !showAddSong && !showAddVersion && !showAddRating &&
          <>
          <button className="back small-button" onClick={e => {
            setArtist(null);
            setSong(null);
            setVersion(null)}}>Change Artist</button>
            <br></br>
          </>}
          {song && !showAddSong && !showAddVersion && !showAddRating &&
          <>
          <button className="back small-button" onClick={e => {
            setSong(null);
            setVersion(null)}}>Change Song</button>
            <br></br>
          </>}
          {version && !showAddSong && !showAddVersion && !showAddRating &&
          <>
          <button className="back small-button" onClick={e => {
            setVersion(null)}}>Change Version</button>
          </>}
        </div>
        <div className="current-selection-div">
          <h2 onClick={e => {
            setSong(null)
            setVersion(null)
            setShowAddSong(false)
            setShowAddVersion(false)
            setShowAddRating(false)
          }}>{artist}</h2>
          <h2 onClick={e => {
            setVersion(null)
            setShowAddSong(false)
            setShowAddVersion(false)
            setShowAddRating(false)
          }}>{song}</h2>
          {version &&
          <h2 onClick={e => {
            setShowAddSong(false)
            setShowAddVersion(false)
            setShowAddRating(false)
          }}>{version.date}</h2>}
        </div>
        {songs && !song && artist && !showAddSong && !showAddVersion && !showAddRating &&
        <p>Choose a song:</p>}
        {songs && !song && artist && !showAddSong && !showAddVersion && !showAddRating &&
        songs.map(song => {
          return (
            <button className="button-in-list" onClick={() => handleSongChange(song)}>{song.song}</button>
          )
        })}
        {songs && !song && artist && !showAddSong && !showAddVersion && !showAddRating &&
        <>
        <br></br>
        <br></br>
        <button className="small-button"
        onClick={e => setShowAddSong(true)}>Add a Song</button>
        </>}
        {showAddSong && !showAddRating &&!showAddVersion &&
        <AddSong setShowAddSong={setShowAddSong}
        artist={artist}
        user={user}
        fetchSongs={fetchSongs}/>
        }
        {song && versions && !version && !showAddVersion && !showAddRating && !showAddSong &&
        <Versions versions={versions} handleVersionChange={handleVersionChange} setShowAddVersion={setShowAddVersion}/>
        }
        {showAddVersion && !showAddRating && !showAddSong &&
        <AddVersion setShowAddVersion={setShowAddVersion}
        artist={artist}
        song={song}
        songData={songData}
        user={user}
        fetchVersions={fetchVersions}/>
        }
        {version &&  !showAddVersion && !showAddRating && !showAddSong &&
        <Reviews
        reviews={reviews}
        song={song}
        songData={songData}
        date={version.date}
        setShowAddRating={setShowAddRating}/>}
        {showAddRating && version &&
        <AddRating
        songData={songData}
        version={version}
        user={user}
        setShowAddRating={setShowAddRating}
        fetchRatings={fetchRatings}
        username={username}/>}
      </div>
    </>
  )
}


export default App;