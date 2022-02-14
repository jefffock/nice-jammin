import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Auth from './Auth'
import Versions from './components/versions'
import Reviews from './components/reviews'
import AddSong from './components/addSong'
import AddVersion from './components/addVersion'
import AddRating from './components/addRating'
import Header from './components/header'
import SongPicker from './components/SongPicker'
import BackButtons from './components/BackButtons'
import CurrentSelection from './components/CurrentSelection'
import ArtistPicker from './components/ArtistPicker'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Ideas from './components/Ideas'
import Leaderboard from './components/Leaderboard'
import Account from './components/Account'
import Support from './components/Support'


function App() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [artists, setArtists] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState(null)
  const [song, setSong] = useState(null)
  const [songData, setSongData] = useState(null)
  const [songName, setSongName] = useState(null)
  const [filteredSongs, setFilteredSongs] = useState([])
  const [songSearchTerm, setSongSearchTerm] = useState('')
  const [versions, setVersions] = useState(null)
  const [version, setVersion] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showPleaseConfirm, setShowPleaseConfirm] = useState(false)
  const [showAddSong, setShowAddSong] = useState(false)
  const [showAddVersion, setShowAddVersion] = useState(false)
  const [showAddRating, setShowAddRating] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [username, setUsername] = useState(null)
  const [points, setPoints] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)
  // const [showArtistPicker, setShowArtistPicker] = useState(true)
  // const [showSongPicker, setShowSongPicker] = useState(false)
  const [showVersions, setShowVersions] = useState(false)
  const [ideas, setIdeas] = useState(null)
  const [showIdeas, setShowIdeas] = useState(null)
  const [showAccount, setShowAccount] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [emailToConfirm, setEmailToConfirm] = useState('')
  const [canWrite, setCanWrite] = useState(true)
  const [showAddLink, setShowAddLink] = useState(false)
  const [linkAdded, setLinkAdded] = useState(false)
  const [leaders, setLeaders] = useState(null)
  const [showLeaders, setShowLeaders] = useState(false)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session !== null) {
        setUser(session.user)
      }
    })
  }, [])

  useEffect(() => {
    setUser(supabase.auth.user())
  }, [])

  useEffect(() => {
    if (user) {
      setShowPleaseConfirm(false)
    } fetchProfile()
  }, [session, user])

  useEffect(() => {
    if (!artists) {
      fetchArtists()
    }
  })

  useEffect(() => {
    if (artist) {
      fetchSongs(artist.artist)
      // setShowArtistPicker(false)
      // setShowSongPicker(true)
    } else {
      // setShowSongPicker(false)
      setShowVersions(false)
    }
    setSong(null);
    setVersions(null);
  }, [artist])

  useEffect(() => {
    if (song) {
      setSongData(song)
      setSongName(song.song)
      fetchVersions(song.id)
      // setShowSongPicker(false)
    } else {
      if (artist) {
        // setShowSongPicker(true)
      }
    }
  }, [song, artist])

  useEffect(() => {
    setShowAddLink(false)
    setLinkAdded(false)
    if (version) {
      fetchRatings(version.id)
    }
  }, [version])

  useEffect(() => {
    if (versions) {
      // setShowArtistPicker(false)
      // setShowSongPicker(false)
    }
  }, [versions])

  useEffect(() => {
    if (showAccount || showIdeas || showSupport || showLeaders) {
      setArtist(null)
      setSong(null)
      setVersion(null)
      setShowAddSong(false)
      setShowAddVersion(false)
      setShowAddRating(false)
      setShowProfile(false)
      setSongName(null)
      setSongSearchTerm('')
      setShowSignUp(false)
      // setShowArtistPicker(false)
    } if (!showAccount && !showIdeas && !showSupport && !showLeaders) {
      // setShowArtistPicker(true)
    }
  }, [showAccount, showIdeas, showSupport, showLeaders])

  useEffect(() => {
    if (showAddSong) {
      setShowAddVersion(false)
      setShowVersions(false)
      setSong(null)
      setSongName('')
    }
  }, [showAddSong])

  async function fetchProfile() {
    const user = supabase.auth.user()
    if (user) {
      let id = user.id
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
      if (error) {
        console.log('error getting profile', error)
      } if (data[0]) {
        setUsername(data[0].name)
        setPoints(data[0].points)
        setAvatarUrl(data[0].avatar_url)
        setCanWrite(data[0].can_write)
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
    } else {
      setArtists(data)
    }
  }

  async function fetchSongs(artist) {
    if (artist) {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('artist', artist)
        .order('ratings', {ascending: false})
      if (error) {
        console.log('error fetching songs', error)
      }
      if (data) {
        if (data.length > 0) {
        setSongs(data)
        setFilteredSongs(data)
      } else {
        setSongs([])
        setFilteredSongs([])
      }
    }
  }
}

useEffect(() => {
  function filterSongs() {
    if (songSearchTerm === '') {
      setFilteredSongs(songs)
    } else {
      let newFilteredSongs = []
      let myRegex = new RegExp(songSearchTerm, "i")
      for (var i = 0; i < songs.length; i++) {
        if (myRegex.test(songs[i].song)) {
          newFilteredSongs.push(songs[i])
        }
      }
      setFilteredSongs(newFilteredSongs)
    }
  } filterSongs()
}, [songs, songSearchTerm])

  async function fetchVersions(songId) {
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      .eq('song_id', songId)
      .order('avg_rating', {ascending: false})
    if (error) {
      console.log('error fetching versions', error)
    } else if (data) {
      setVersions(data)
    }
  }

  async function fetchRatings(versionId) {
    const { data, error } = await supabase
      .from('ratings')
      .select('*, versions!inner(*)')
      .eq('versions.id', versionId)
      .order('helpful', {ascending: false})
    if (error) {
      console.log(error)
    } else if (data) {
      setReviews(data)
    }
  }

  async function fetchIdeas() {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('votes', { ascending: false})
    if (error) {
      console.log('error fetching ideas', error)
    } else {
      setIdeas(data)
    }
  }

  async function fetchLeaders() {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, points')
      .not('name', 'eq', 'Henrietta')
      .limit(10)
      .order('points', {ascending: false})
    if (error) {
      console.log('error fetching top contributors', error)
    } else {
      console.log('top contributors', data)
      setLeaders(data)
    }
  }

  async function signOut() {
    setShowProfile(false)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('error', error)
    } else {
      console.log('signed out')
    }
  }

  async function addOnePoint(profileName) {
    const { error } = await supabase.rpc( 'add_one_point', { username: profileName })
    if (error) {
      console.log('error adding one point', error)
    }
  }

  async function addTenPoints(profileName) {
    const { error } = await supabase.rpc( 'add_ten_points', { username: profileName })
    if (error) {
      console.log('error adding ten points', error)
    }
  }

  async function addRatingCountToArtist(artistId) {
    const { error } = await supabase.rpc( 'add_rating_count_artist', { artistid: artistId })
    if (error) {
      console.log('error adding rating count to artist', error)
    }
  }

    async function addRatingCountToSong(songId) {
      let song_id = parseInt(songId)
    const { error } = await supabase.rpc( 'increment_rating_count_song', { songid: song_id })
    if (error) {
      console.log('error adding incrementing song rating count', error)
    }
  }

  async function calcAverageForVersion(versionId) {
    let version = parseInt(versionId)
    const { error } = await supabase.rpc( 'calc_average', { versionid: version })
    if (error) {
      console.log('error calculating average', error)
    }
  }

  async function countHelpfulVotesRatings(ratingId) {
    const { error } = await supabase.rpc( 'count_helpful_votes_ratings', {ratingid: ratingId})
      if (error) {
        console.log('error counting helpful votes', error)
      }
  }

  async function countFunnyVotesRatings(ratingId) {
    const { error } = await supabase.rpc( 'count_funny_votes_ratings', {ratingid: ratingId})
      if (error) {
        console.log('error counting funny votes', error)
      }
  }

  async function countHelpfulVotesIdeas(ideaId) {
    console.log('in count helpful votes ideas')
    const { error } = await supabase.rpc( 'count_helpful_votes_ideas', {ideaid: ideaId})
      if (error) {
        console.log('error counting helpful votes ideas', error)
      }
  }

  function handleNotConfirmedYet() {
    setShowPleaseConfirm(true)
  }

  function goHome() {
    setShowMenu(false)
    setArtist(null)
    setSong(null)
    setVersion(null)
    setShowAddSong(false)
    setShowAddVersion(false)
    setShowAddRating(false)
    setShowProfile(false)
    setSongName(null)
    setSongSearchTerm('')
    setShowSignUp(false)
    // setShowArtistPicker(true)
  }

  function handleShowAddSong(songName) {
    if (songName) {
      setSongSearchTerm(songName)
    }
    setShowAddVersion(false)
    setShowAddSong(true)
    setSongName('')
  }

  function addPointsToVersion(id, points) {
    for (var i = 0; i < versions.length; i++) {
      if (versions[i].id === id) {
        versions[i].points = points;
        break;
      }
    }
  }

  if (showSignIn || showSignUp) {
    return (
      <div className="app">
        <div className="header-and-subheading">
        <h1>Nice Jammin</h1>
        <h3>Helping fans find jams</h3>
        </div>
        <Auth
        handleNotConfirmedYet={handleNotConfirmedYet}
        setUser={setUser}
        setSession={setSession}
        fetchProfile={fetchProfile}
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        showSignUp={showSignUp}
        setEmailToConfirm={setEmailToConfirm}/>
      </div>
    )
  } return (
    <>
      <div className="app">
        <Router>
          <NavBar user={user}/>
          <Routes>
            <Route path="/" element={<Navigate to="/artists"  />} />
            <Route path="/top-contributors" element={<Leaderboard fetchLeaders={fetchLeaders} leaders={leaders}/>}/>
            <Route path="/ideas" element={<Ideas fetchIdeas={fetchIdeas} ideas={ideas}/>}/>
            <Route path="/account" element={<Account fetchProfile={fetchProfile} username={username} points={points}/>}/>
            <Route path="/support" element={<Support />}/>
            <Route path="/sign-up" element={<Auth />}/>
            <Route path="/sign-in" element={<Auth />}/>
            <Route path="artists/*" element={<ArtistPicker artists={artists} setArtist={setArtist}/>}>
              <Route path=":artistId/*" element={<SongPicker songs={songs} filteredSongs={filteredSongs}
              artist={artist} song={song} version={version}
              setArtist={setArtist} setSong={setSong} setVersion={setVersion}/>}>
                <Route path="songs/:songId" element={<Versions versions={versions}
                addPointsToVersion={addPointsToVersion} setVersion={setVersion}/>}>
                  <Route path="versions/:versionId" element={<Reviews reviews={reviews} fetchRatings={fetchRatings}/>} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
        {/* <Header session={session}
          showPleaseConfirm={showPleaseConfirm}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          setShowProfile={setShowProfile}
          showProfile={showProfile}
          signOut={signOut}
          goHome={goHome}
          setSession={setSession}
          username={username}
          points={points}
          avatar={avatar_url}
          user={user}
          fetchProfile={fetchProfile}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setShowArtistPicker={setShowArtistPicker}
          fetchIdeas={fetchIdeas}
          ideas={ideas}
          showAccount={showAccount}
          setShowAccount={setShowAccount}
          showIdeas={showIdeas}
          setShowIdeas={setShowIdeas}
          showSupport={showSupport}
          setShowSupport={setShowSupport}
          countHelpfulVotesIdeas={countHelpfulVotesIdeas}
          emailToConfirm={emailToConfirm}
          canWrite={canWrite}
          addTenPoints={addTenPoints}
          addOnePoint={addOnePoint}
          leaders={leaders}
          fetchLeaders={fetchLeaders}
          showLeaders={showLeaders}
          setShowLeaders={setShowLeaders}/>
        <BackButtons artist={artist}
          song={song}
          version={version}
          showAddSong={showAddSong}
          showAddRating={showAddRating}
          showAddVersion={showAddVersion}
          setArtist={setArtist}
          setSong={setSong}
          setSongName={setSongName}
          setVersion={setVersion}
          goHome={goHome}
          setShowVersions={setShowVersions}
          setShowSongPicker={setShowSongPicker}
          setShowArtistPicker={setShowArtistPicker}
          />
        <CurrentSelection
          artist={artist}
          songName={songName}
          version={version}
          showAddRating={showAddRating}
          setShowArtistPicker={setShowArtistPicker}
          setArtist={setArtist}
          setSong={setSong}
          setVersion={setVersion}
          setShowAddSong={setShowAddSong}
          setShowAddVersion={setShowAddVersion}
          setShowAddRating={setShowAddRating}
          setSongName={setSongName}
          setSongSearchTerm={setSongSearchTerm}
          songData={songData}
          showAddLink={showAddLink}
          setShowAddLink={setShowAddLink}
          username={username}
          addTenPoints={addTenPoints}
          fetchVersions={fetchVersions}
          linkAdded={linkAdded}
          setLinkAdded={setLinkAdded}/>
        {!artist && showArtistPicker && !showPleaseConfirm &&
          <ArtistPicker artist={artist}
            artists={artists}
            setArtist={setArtist}/>}
        {(showSongPicker && (artist && !song)) && !showAddVersion && !showAddSong && !showAddRating &&
        <>
        <SongPicker artist={artist}
        filteredSongs={filteredSongs}
        song={song}
        songs={songs}
        showAddSong={showAddSong}
        showAddVersion={showAddVersion}
        showAddRating={showAddRating}
        setSong={setSong}
        handleShowAddSong={handleShowAddSong}
        songSearchTerm={songSearchTerm}
        setSongSearchTerm={setSongSearchTerm}
        showSongPicker={showSongPicker}
        setShowSongPicker={setShowSongPicker}/>
        </>
        }
        {showAddSong && !showAddRating &&!showAddVersion &&
        <AddSong setShowAddSong={setShowAddSong}
        artist={artist}
        user={user}
        fetchSongs={fetchSongs}
        nameToAdd={songSearchTerm}
        username={username}
        addTenPoints={addTenPoints}
        canWrite={canWrite}/>
        }
        {(showVersions || (artist && song && !version)) && !showAddVersion &&
        <Versions versions={versions}
        setShowAddVersion={setShowAddVersion}
        showAddVersion={showAddVersion}
        addPointsToVersion={addPointsToVersion}
        setVersion={setVersion}/>
        }
        {showAddVersion && !showAddRating && !showAddSong &&
        <AddVersion setShowAddVersion={setShowAddVersion}
        artist={artist}
        songName={songName}
        songData={songData}
        user={user}
        fetchVersions={fetchVersions}
        songs={songs}
        username={username}
        handleShowAddSong={handleShowAddSong}
        addOnePoint={addOnePoint}
        addTenPoints={addTenPoints}
        canWrite={canWrite}/>
        }
        {version && !showAddVersion && !showAddRating && !showAddSong &&
        <Reviews
        reviews={reviews}
        songData={songData}
        date={version.date}
        setShowAddRating={setShowAddRating}
        addOnePoint={addOnePoint}
        username={username}
        countHelpfulVotesRatings={countHelpfulVotesRatings}
        countFunnyVotesRatings={countFunnyVotesRatings}
        version={version}
        fetchRatings={fetchRatings}/>}
        {showAddRating && version &&
        <AddRating
        songData={songData}
        version={version}
        user={user}
        setShowAddRating={setShowAddRating}
        fetchRatings={fetchRatings}
        fetchVersions={fetchVersions}
        username={username}
        addOnePoint={addOnePoint}
        addTenPoints={addTenPoints}
        addRatingCountToArtist={addRatingCountToArtist}
        addRatingCountToSong={addRatingCountToSong}
        artist={artist}
        calcAverageForVersion={calcAverageForVersion}
        canWrite={canWrite}/>}
        <div className="header-spacer"></div> */}
      </div>
    </>
  )
}


export default App;