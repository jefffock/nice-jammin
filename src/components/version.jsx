import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

function Version(props) {
  let [tags, setTags] = useState('')


  useEffect(() => {
    console.log('props in Version', props)
    let tagBuilder = '';
    if (props.data.acoustic) {
      tagBuilder+='Acoustic, '
    } if (props.data.ambient) {
      tagBuilder+='Ambient, '
    } if (props.data.bliss) {
      tagBuilder+='Bliss, '
    } if (props.data.crunchy) {
      tagBuilder+='Crunchy, '
    } if (props.data.dark) {
      tagBuilder+='Dark, '
    } if (props.data.fast) {
      tagBuilder+='Fast, '
    } if (props.data.funky) {
      tagBuilder+='Funky, '
    } if (props.data.groovy) {
      tagBuilder+='Groovy, '
    } if (props.data.guest) {
      tagBuilder+='Guest, '
    } if (props.data.happy) {
      tagBuilder+='Happy, '
    } if (props.data.heavy) {
      tagBuilder+='Heavy, '
    } if (props.data.jazzy) {
      tagBuilder+='Jazzy, '
    } if (props.data.peaks) {
      tagBuilder+='Peaks, '
    } if (props.data.reggae) {
      tagBuilder+='Reggae, '
    } if (props.data.shred) {
      tagBuilder+='Shred, '
    } if (props.data.silly) {
      tagBuilder+='Silly, '
    } if (props.data.slow) {
      tagBuilder+='Slow, '
    } if (props.data.soaring) {
      tagBuilder+='Soaring, '
    } if (props.data.trippy) {
      tagBuilder+='Trippy, '
    } if (props.data.type2) {
      tagBuilder+='Type II, '
    } let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    setTags(finalTags)
  }, [props])

  function handleClick() {
    let version = {
      id: props.data.id,
      date: props.data.date
    }
    props.handleVersionChange(version)
  }

  if (props) {
  return (
    <>
      <div className="version-col1 version-date" onClick={e => handleClick()}>
        <p>{props.data.date}</p>
      </div>
      <div className="version-col2">
        <p>{props.data.avg_rating}</p>
      </div>
      <div className="version-col3">
        <p>{props.data.num_reviews}</p>
      </div>
      <div className="version-col4">
        <p>{tags}</p>
      </div>
      <div className="line"></div>
    </>
    )
  }
}

export default Version