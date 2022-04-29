import { supabase } from '../supabaseClient'
import { useState, useEffect } from 'react'

function About (props) {
  const [userCount, setUserCount] = useState(null)
  const [versionCount, setVersionCount] = useState(null)
  const [songCount, setSongCount] = useState(null)
  const [artistCount, setArtistCount] = useState(null)

  useEffect(() => {
    getUserCount()
    getVersionCount()
    getSongCount()
    getArtistCount()
  }, [])

  async function getUserCount() {
    let { count, error } = await supabase
      .from('profiles')
      .select('*', {count: 'exact', head: true})
    if (error) {
      console.log(error)
    } else {
      setUserCount(count)
    }
  }

  async function getVersionCount() {
    let { count, error } = await supabase
      .from('versions')
      .select('*', {count: 'exact', head: true})
    if (error) {
      console.log(error)
    } else {
      setVersionCount(count)
    }
  }

  async function getSongCount() {
    let { count, error } = await supabase
      .from('songs')
      .select('*', {count: 'exact', head: true})
    if (error) {
      console.log(error)
    } else {
      setSongCount(count)
    }
  }

  async function getArtistCount() {
    let { count, error } = await supabase
      .from('artists')
      .select('*', {count: 'exact', head: true})
    if (error) {
      console.log(error)
    } else {
      setArtistCount(count)
    }
  }

  return (
    <div className="support-container">
      <div className="support-wrapper">
        <h3>thank you for helping make &#128293; jams easier to find</h3>
        <p><strong>{userCount} music lovers</strong> have added</p><br></br>
        <p><strong>{versionCount} versions</strong> of</p><br></br>
        <p><strong>{songCount} songs</strong> by</p><br></br>
        <p><strong>{artistCount} artists</strong></p><br></br><br></br>
        <p></p>
        <div className="roadmap">
        <h3>Roadmap</h3>
        <p className="roadmap-item">Home page has "Discover" - see highest versions of all songs, or filter by artist or by song or filters</p>
        <p className="roadmap-item">Link existing jam resources for each band</p>
        <p className="roadmap-item">Modern feel and look</p>
        <p className="roadmap-item">Automatically add every version of every song so when you go to rate it, it's there</p>
        <p className="roadmap-item">Your Ideas!</p>
        </div>
        <br></br><br/>
        <p>Enjoying nice jammin? there are several ways you can show your support:</p>
        <br></br>
        <div className="support-list-item">
        <p className="support-list-item">1. share your knowledge by adding songs, versions, ratings, comments, and ideas.</p>
        <br></br>
        <p className="support-list-item">2. share this with your friends!</p>
        <br></br>
        <p className="support-list-item">3. contribute code to the <a href="https://github.com/jefffock/nice-jammin">Github repository</a></p>
        <br></br>
        </div>
        <br></br>
        <p>Thank you!</p>
      </div>
    </div>

  )
}

export default About