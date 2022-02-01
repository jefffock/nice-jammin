import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import './App.css';
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
  const [showArtistPicker, setShowArtistPicker] = useState(true)
  const [showSongPicker, setShowSongPicker] = useState(false)
  const [showVersions, setShowVersions] = useState(false)
  const [ideas, setIdeas] = useState(null)
  const [showIdeas, setShowIdeas] = useState(null)
  const [showAccount, setShowAccount] = useState(false)
  const [showBugReport, setShowBugReport] = useState(false)
  const [showSupport, setShowSupport] = useState(false)

  useEffect(() => {
    console.log('in the set session hook')
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
      setShowArtistPicker(false)
      setShowSongPicker(true)
    } else {
      setShowSongPicker(false)
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
      setShowSongPicker(false)
    } else {
      if (artist) {
        setShowSongPicker(true)
      }
    }
  }, [song])

  useEffect(() => {
    if (version) {
      fetchRatings(version.id)
    }
  }, [version])

  useEffect(() => {
    if (versions) {
      setShowArtistPicker(false)
      setShowSongPicker(false)
    }
  }, [versions])

  async function fetchProfile() {
    const user = supabase.auth.user()
    if (user) {
      let id = user.id
      console.log('id', id)
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
      if (error) {
        console.log('error getting profile')
      } if (data) {
        console.log('data in fetchProfile', data)
        setUsername(data[0].name)
        setPoints(data[0].points)
        setAvatarUrl(data[0].avatar_url)
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
        console.log('data', data)
        if (data.length > 0) {
        console.log('data length > 0')
        setSongs(data)
        setFilteredSongs(data)
      } else {
        setSongs([])
        setFilteredSongs([])
      }
    }
  }
}

  async function fetchVersions(songId) {
    console.log('currentSongid in fetch Versions', songId)
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
    console.log('version data', data)
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
    console.log('review data', data)
  }

  async function fetchIdeas() {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('votes', { ascending: false})
    if (error) {
      console.log('error fetching ideas', error)
    } else {
      console.log('data in fetchIdeas', data)
      setIdeas(data)
    }
  }

  async function signOut() {
    setShowProfile(false)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('error,', error)
    } else {
      console.log('signed out')
    }
  }

  async function addOnePoint(profileName) {
    const { data, error } = await supabase.rpc( 'add_one_point', { username: profileName })
    if (error) {
      console.log('error adding one point', error)
    } if (data) {
      console.log('data from adding one point', data)
    }
  }

  async function addTenPoints(profileName) {
    const { data, error } = await supabase.rpc( 'add_ten_points', { username: profileName })
    if (error) {
      console.log('error adding ten points', error)
    } if (data) {
      console.log('data from adding ten points', data)
    }
  }

  async function addRatingCountToArtist(artistId) {
    console.log('in add rating count to artist', artistId, typeof artistId)
    const { data, error } = await supabase.rpc( 'add_rating_count_artist', { artistid: artistId })
    if (error) {
      console.log('error adding rating count to artist', error)
    } if (data) {
      console.log('data from adding rating count to artist', data)
    }
  }

    async function addRatingCountToSong(songId) {
      let song_id = parseInt(songId)
      console.log('song_id', song_id, typeof song_id)
    const { data, error } = await supabase.rpc( 'increment_rating_count_song', { songid: song_id })
    if (error) {
      console.log('error adding incrementing song rating count', error)
    } if (data) {
      console.log('data from adding song rating count', data)
    }
  }

  async function calcAverageForVersion(versionId) {
    let version = parseInt(versionId)
    const { data, error } = await supabase.rpc( 'calc_average', { versionid: version })
    if (error) {
      console.log('error calculating average', error)
    } if (data) {
      console.log('data from calcing average', data)
    }
  }

  function handleNotConfirmedYet() {
    setShowPleaseConfirm(true)
  }

  function goHome() {
    console.log('in go home')
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
    setShowMenu(false)
    setShowArtistPicker(true)
  }

  function handleShowAddSong(songName) {
    if (songName) {
      setSongSearchTerm(songName)
    }
    setShowAddVersion(false)
    setShowAddSong(true)
    setSongName('')
  }

  function filterSongs(searchTerm) {
    console.log('searchTerm', searchTerm)
    setSongSearchTerm(searchTerm)
    if (searchTerm === '') {
      setFilteredSongs(songs)
    } else {
      let newFilteredSongs = []
      let myRegex = new RegExp(searchTerm, "ig")
      for (var i = 0; i < songs.length; i++) {
        if (myRegex.test(songs[i].song)) {
          newFilteredSongs.push(songs[i])
        }
      }
      setFilteredSongs(newFilteredSongs)
    }
  }

  function addPointsToVersion(id, points) {
    console.log('in addPointsToVersion')
    for (var i = 0; i < versions.length; i++) {
      if (versions[i].id === id) {
        console.log('in the if block')
        versions[i].points = points;
        break;
      }
    } console.log('versions[i]', versions[i])
  }

  if (showSignIn || showSignUp) {
    return (
      <div className="app">
        <h1>Nice Jammin</h1>
        <Auth
        handleNotConfirmedYet={handleNotConfirmedYet}
        setUser={setUser}
        fetchProfile={fetchProfile}
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        showSignUp={showSignUp}/>
      </div>
    )
  } return (
    <>
      <div className="app">
        <Header session={session}
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
          showBugReport={showBugReport}
          setShowBugReport={setShowBugReport}
          showSupport={showSupport}
          setShowSupport={setShowSupport}/>
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
          setShowArtistPicker={setShowArtistPicker}/>
        <CurrentSelection
          artist={artist}
          songName={songName}
          version={version}
          setSong={setSong}
          setVersion={setVersion}
          setShowAddSong={setShowAddSong}
          setShowAddVersion={setShowAddVersion}
          setShowAddRating={setShowAddRating}
          setSongName={setSongName}
          setSongSearchTerm={setSongSearchTerm}/>
        {!artist && showArtistPicker &&
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
        filterSongs={filterSongs}
        songSearchTerm={songSearchTerm}
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
        addTenPoints={addTenPoints}/>
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
        addTenPoints={addTenPoints}/>
        }
        {version &&  !showAddVersion && !showAddRating && !showAddSong &&
        <Reviews
        reviews={reviews}
        songData={songData}
        date={version.date}
        setShowAddRating={setShowAddRating}
        addOnePoint={addOnePoint}
        username={username}/>}
        {showAddRating && version &&
        <AddRating
        songData={songData}
        version={version}
        user={user}
        setShowAddRating={setShowAddRating}
        fetchRatings={fetchRatings}
        username={username}
        addOnePoint={addOnePoint}
        addTenPoints={addTenPoints}
        addRatingCountToArtist={addRatingCountToArtist}
        addRatingCountToSong={addRatingCountToSong}
        artist={artist}
        calcAverageForVersion={calcAverageForVersion}/>}
      </div>
    </>
  )
}


export default App;