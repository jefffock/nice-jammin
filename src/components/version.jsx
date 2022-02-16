import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Version(props) {
  let [tags, setTags] = useState('')

  useEffect(() => {
    let tagBuilder = '';
    if (props.versionData.acoustic) {
      tagBuilder+='acoustic, '
    }
     if (props.versionData.ambient) {
      tagBuilder+='ambient, '
    }
    if (props.versionData.bliss) {
      tagBuilder+='bliss, '
    }
    if (props.versionData.bluesy) {
      tagBuilder+='bluesy, '
    }
    if (props.versionData.chaotic) {
      tagBuilder+='chaotic, '
    }
     if (props.versionData.crunchy) {
      tagBuilder+='crunchy, '
    }
    if (props.versionData.dark) {
      tagBuilder+='dark, '
    }
    if (props.versionData.dissonant) {
      tagBuilder+='dissonant, '
    }
     if (props.versionData.fast) {
      tagBuilder+='fast, '
    }
     if (props.versionData.funky) {
      tagBuilder+='funky, '
    }
     if (props.versionData.groovy) {
      tagBuilder+='groovy, '
    }
     if (props.versionData.guest) {
      tagBuilder+='guest, '
    }
     if (props.versionData.happy) {
      tagBuilder+='happy, '
    }
     if (props.versionData.heavy) {
      tagBuilder+='heavy, '
    }
     if (props.versionData.jazzy) {
      tagBuilder+='jazzy, '
    }
    if (props.versionData.long) {
      tagBuilder+='long, '
    }
    if (props.versionData.multi_part) {
      tagBuilder+='multi-part, '
    }
    if (props.versionData.official_release) {
      tagBuilder+='official release, '
    }
     if (props.versionData.peaks) {
      tagBuilder+='peaks, '
    }
     if (props.versionData.reggae) {
      tagBuilder+='reggae, '
    }
    if (props.versionData.segue) {
      tagBuilder+='segue, '
    }
     if (props.versionData.shred) {
      tagBuilder+='shred, '
    }
    if (props.versionData.silly) {
      tagBuilder+='silly, '
   }
    if (props.versionData.sloppy) {
      tagBuilder+='sloppy, '
    }
    if (props.versionData.slow) {
     tagBuilder+='slow, '
   }
    if (props.versionData.sludgy) {
      tagBuilder+='sludgy, '
    }
    if (props.versionData.soaring) {
      tagBuilder+='soaring, '
    }
    if (props.versionData.soulful) {
      tagBuilder+='soulful, '
    }
    if (props.versionData.stop_start) {
      tagBuilder+='stop-start, '
    }
    if (props.versionData.synthy) {
      tagBuilder+='synthy, '
    }
     if (props.versionData.tease) {
      tagBuilder+='teases, '
    }
    if (props.versionData.that_years_style) {
      tagBuilder+='that year\'s style, '
    }
     if (props.versionData.trippy) {
      tagBuilder+='trippy, '
    }
     if (props.versionData.type2) {
      tagBuilder+='type\u00A0II, '
    }
    if (props.versionData.unusual) {
      tagBuilder+='unusual, '
    }
    let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
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
        <p className="rating-in-version">{(props.versionData.avg_rating).toFixed(2)}</p>
      </div>
      <div className="version-col4">
      <div className="tags-version-div">
        <p className="tags-version">{tags}</p>
      </div>
      </div>
    </>
    )
  }
}

export default Version