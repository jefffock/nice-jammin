import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Version(props) {
  let [tags, setTags] = useState('')
  let [points, setPoints] = useState(props.versionData.points || null)

  useEffect(() => {
    console.log('props in version', props)
  })

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
    } if (props.versionData.tease) {
      tagBuilder+='Teases, '
    } if (props.versionData.trippy) {
      tagBuilder+='Trippy, '
    } if (props.versionData.type2) {
      tagBuilder+='Type\u00A0II, '
    } let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    setTags(finalTags)
    if (!props.versionData.name || !props.versionData.points) {
      async function getNameAndPoints() {
        const { data, error } = await supabase
          .from('profiles')
          .select('points')
          .eq('name', props.versionData.submitter_name)
        if (error) {
          console.log('error getting points', error)
        } else {
          console.log('data', data)
          setPoints(data[0].points)
          props.addPointsToVersion(props.versionData.id, data[0].points)
        }
      } getNameAndPoints()
    }
  }, [props])


  if (props) {
  return (
    <>
      <div className="version-col1" onClick={e => props.setVersion(props.versionData)}>
        <p className="version-date">{props.versionData.date}</p>
      </div>
      <div className="version-col2">
        <p>{props.versionData.location}</p>
      </div>
      <div className="version-col3">
      <div className="tags-version-div">
        <p className="tags-version">{tags}</p>
      </div>
      </div>
      <div className="version-col4">
        <p>{(props.versionData.avg_rating).toFixed(3)}</p>
      </div>
      <div className="line"></div>
    </>
    )
  }
}

export default Version