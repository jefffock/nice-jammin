import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Version(props) {
  let [tags, setTags] = useState('')
  let [name, setName] = useState(props.versionData.name || '')
  let [points, setPoints] = useState(props.versionData.points || null)

  useEffect(() => {
    // console.log('props.data in version', props.versionData)
    let tagBuilder = '';
    if (props.versionData.acoustic) {
      tagBuilder+='Acoustic, '
    } if (props.versionData.ambient) {
      tagBuilder+='Ambient, '
    } if (props.versionData.bliss) {
      tagBuilder+='Bliss, '
    } if (props.versionData.crunchy) {
      tagBuilder+='Crunchy, '
    } if (props.versionData.dark) {
      tagBuilder+='Dark, '
    } if (props.versionData.fast) {
      tagBuilder+='Fast, '
    } if (props.versionData.funky) {
      tagBuilder+='Funky, '
    } if (props.versionData.groovy) {
      tagBuilder+='Groovy, '
    } if (props.versionData.guest) {
      tagBuilder+='Guest, '
    } if (props.versionData.happy) {
      tagBuilder+='Happy, '
    } if (props.versionData.heavy) {
      tagBuilder+='Heavy, '
    } if (props.versionData.jazzy) {
      tagBuilder+='Jazzy, '
    } if (props.versionData.peaks) {
      tagBuilder+='Peaks, '
    } if (props.versionData.reggae) {
      tagBuilder+='Reggae, '
    } if (props.versionData.shred) {
      tagBuilder+='Shred, '
    } if (props.versionData.silly) {
      tagBuilder+='Silly, '
    } if (props.versionData.slow) {
      tagBuilder+='Slow, '
    } if (props.versionData.soaring) {
      tagBuilder+='Soaring, '
    } if (props.versionData.trippy) {
      tagBuilder+='Trippy, '
    } if (props.versionData.type2) {
      tagBuilder+='Type II, '
    } let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    setTags(finalTags)
    if (!props.versionData.name || !props.versionData.points) {
      async function getNameAndPoints() {
        const { data, error } = await supabase
          .from('profiles')
          .select('points, name')
          .eq('id', props.versionData.version_user_id)
        if (error) {
          alert('error getting name and points')
        } else {
          // console.log('data', data)
          setName(data[0].name)
          setPoints(data[0].points)
          props.addNameAndPointsToVersion(props.versionData.id, data[0].name, data[0].points)
        }
      } getNameAndPoints()
    }
  }, [props])


  function handleClick() {
    props.handleVersionChange(props.versionData)
  }

  if (props) {
  return (
    <>
      <div className="version-col1" onClick={e => handleClick()}>
        <p className="version-date">{props.versionData.date}</p>
      </div>
      <div className="version-col2">
        <p>{props.versionData.avg_rating}</p>
      </div>
      <div className="version-col3">
        <p>{tags}</p>
      </div>
      <div className="version-col4">
        <p>{name}, {points}</p>
      </div>
      <div className="line"></div>
    </>
    )
  }
}

export default Version