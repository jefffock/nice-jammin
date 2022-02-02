import AddIdea from './AddIdea'
import { useState, useEffect } from 'react'
import FilterChip from './FilterChip'
import Idea from './Idea'

function Ideas(props) {
  const [showAddIdea, setShowAddIdea] = useState(false)
  const [ideasToShow, setIdeasToShow] = useState(null)
  const [artistIdeas, setArtistIdeas] = useState(null)
  const [featureIdeas, setFeatureIdeas] = useState(null)
  const [tagIdeas, setTagIdeas] = useState(null)
  const [otherIdeas, setOtherIdeas] = useState(null)
  const [fillFeature, setFillFeature] = useState(false)
  const [fillArtist, setFillArtist] = useState(false)
  const [fillTag, setFillTag] = useState(false)
  const [fillOther, setFillOther] = useState(false)

    useEffect(() => {
    let newOtherIdeas = []
    let newArtistIdeas = []
    let newFeatureIdeas = []
    let newTagIdeas = []
    console.log('in the use effect block for ideas')
    if (props.ideas) {
      setIdeasToShow(props.ideas)
      console.log('in the if block', props.ideas)
      for (var i = 0; i < props.ideas.length; i++) {
        if (props.ideas[i].artist_idea) {
          newArtistIdeas.push(props.ideas[i])
        } else if (props.ideas[i].feature_idea) {
          newFeatureIdeas.push(props.ideas[i])
        } else if (props.ideas[i].other_idea) {
          newOtherIdeas.push(props.ideas[i])
        } else if (props.ideas[i].tag_idea) {
          newTagIdeas.push(props.ideas[i])
        }
      }
    } else {
      props.fetchIdeas()
    } console.log('ideas: artist', newArtistIdeas, 'other', newOtherIdeas, 'feature',
    newFeatureIdeas, 'tag', newTagIdeas)
    setArtistIdeas(newArtistIdeas)
    setOtherIdeas(newOtherIdeas)
    setFeatureIdeas(newFeatureIdeas)
    setTagIdeas(newTagIdeas)
    console.log('ideas to show', ideasToShow)
    }, [props, ideasToShow])

    function handleArtistIdeaClick() {
    if (!fillArtist) {
    setFillArtist(true)
    setIdeasToShow(artistIdeas)
    setFillFeature(false)
    setFillTag(false)
    setFillOther(false)
    } else {
      setFillArtist(false)
      setIdeasToShow(props.ideas)
    }
  }

  function handleFeatureClick() {
  if (!fillFeature) {
    setFillArtist(false)
    setIdeasToShow(featureIdeas)
    setFillFeature(true)
    setFillTag(false)
    setFillOther(false)
    } else {
      setFillFeature(false)
      setIdeasToShow(props.ideas)
    }
  }

  function handleTagIdeaClick() {
    if (!fillTag) {
    setFillTag(true)
    setFillArtist(false)
    setIdeasToShow(tagIdeas)
    setFillFeature(false)
    setFillOther(false)
    } else {
      setFillTag(false)
      setIdeasToShow(props.ideas)
    }
  }

  function handleOtherClick() {
    if (!fillOther) {
    setFillOther(true)
    setFillArtist(false)
    setIdeasToShow(otherIdeas)
    setFillFeature(false)
    setFillTag(false)
    } else {
      setFillOther(false)
      setIdeasToShow(props.ideas)
    }
  }

return (
  <div className="ideas-container">
    <div className="ideas-wrapper">
    <h3>Ideas</h3>
    <br></br>
    <p>Have an idea for this site? Please share!</p>
    <br></br>
    {showAddIdea &&
    <AddIdea setShowAddIdea={setShowAddIdea}
    username={props.username}/>}
    {!showAddIdea && <button className="small-button"
    onClick={e => setShowAddIdea(true)}>Add An Idea</button>}
    <br></br>
    <br></br>
    <FilterChip currentFilterState={fillFeature} text='Feature' setFilter={handleFeatureClick}/>
    <FilterChip currentFilterState={fillArtist} text='Artist to add' setFilter={handleArtistIdeaClick}/>
    <FilterChip currentFilterState={fillTag} text='Tag Idea' setFilter={handleTagIdeaClick}/>
    <FilterChip currentFilterState={fillOther} text='Other' setFilter={handleOtherClick}/>
    <br></br>
    {ideasToShow &&
    ideasToShow.map((idea) => {
      return (
      <Idea ideaData={idea}/>
      )
    })
    }
    </div>
  </div>
)
}

export default Ideas