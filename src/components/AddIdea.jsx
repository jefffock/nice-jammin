import { useState } from 'react'
import FilterChip from './FilterChip'
import { supabase } from './../supabaseClient'

function AddIdea(props) {
  const [idea, setIdea] = useState('')
  const [feature, setFeature] = useState(null)
  const [artistIdea, setArtistIdea] = useState(null)
  const [tagIdea, setTagIdea] = useState(null)
  const [other, setOther] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  function handleArtistIdeaClick() {
    setArtistIdea(true)
    setTagIdea(false)
    setOther(false)
    setFeature(false)
  }

  function handleFeatureClick() {
  setArtistIdea(false)
  setTagIdea(false)
  setOther(false)
  setFeature(true)
  }

  function handleTagIdeaClick() {
  setArtistIdea(false)
  setTagIdea(true)
  setOther(false)
  setFeature(false)
  }

  function handleOtherClick() {
  setArtistIdea(false)
  setTagIdea(false)
  setOther(true)
  setFeature(false)
  }

  function testIdea() {
    let valid = true
    if (!props.username || !props.canWrite) {
      valid = false;
      alert('Please log in to add your idea')
    }
    if (!feature && ! artistIdea && !tagIdea && !other) {
      valid = false
      alert('Please select a category')
    } if (idea.length > 4000) {
      valid = false;
      alert(`Character limit exceeded. Max is 4000, you had ${idea.length}`)
    } if (idea.length < 1) {
      valid = false
      alert('Please add an idea')
    }
      if (valid) {
        addIdea()
    }
  }

  async function addIdea() {
    let ideaToAdd = {
      user_name: props.username,
      idea_body: idea,
      tag_idea: tagIdea,
      feature_idea: feature,
      other_idea: other,
      artist_idea: artistIdea
    }
    const { error } = await supabase
      .from('ideas')
      .insert(ideaToAdd)
    if (error) {
      console.log('error adding idea', error)
    } else {
      props.addTenPoints(props.username)
      setShowSuccessMessage(true)
    }
  }



  return (
    <div className="add-idea">
      <h3>Add Idea</h3>
      <div className="tags">
          <FilterChip currentFilterState={feature} text='Feature' setFilter={handleFeatureClick}/>
          <FilterChip currentFilterState={artistIdea} text='Artist to add' setFilter={handleArtistIdeaClick}/>
          <FilterChip currentFilterState={tagIdea} text='Tag' setFilter={handleTagIdeaClick}/>
          <FilterChip currentFilterState={other} text='Other' setFilter={handleOtherClick}/>
        </div>
        <br></br>
      <label htmlFor="idea" className="hidden">Idea: </label>
        <br></br>
        <textarea
        type="text-area"
        name="idea"
        className="inputField text-input"
        placeholder="Your idea..."
        cols="40"
        rows="5"
        value={idea}
        onChange={e => {setIdea(e.target.value); setShowSuccessMessage(false);}}></textarea>
        <br></br>
        <button className="primary-button large" disabled={showSuccessMessage}
        onClick={e => testIdea()}>Add this idea</button>
        <br></br>
        <br></br>
        {showSuccessMessage &&
        <p>Successfully added this idea. Thank you!</p>}
        <br></br>
        <br></br>
        <button className="small-button back"
        onClick={e => props.setShowAddIdea(false)}>Done Adding Ideas</button>
    </div>
  )
}

export default AddIdea