import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Version(props) {
  let [tags, setTags] = useState('')

  useEffect(() => {
    let tagBuilder = '';
    if (props.versionData.acoustic) {
      tagBuilder+='Acoustic, '
    }
     if (props.versionData.ambient) {
      tagBuilder+='Ambient, '
    }
    if (props.versionData.bliss) {
      tagBuilder+='Bliss, '
    }
    if (props.versionData.bluesy) {
      tagBuilder+='Bluesy, '
    }
    if (props.versionData.chaotic) {
      tagBuilder+='Chaotic, '
    }
     if (props.versionData.crunchy) {
      tagBuilder+='Crunchy, '
    }
    if (props.versionData.dark) {
      tagBuilder+='Dark, '
    }
    if (props.versionData.dissonant) {
      tagBuilder+='Dissonant, '
    }
     if (props.versionData.fast) {
      tagBuilder+='Fast, '
    }
     if (props.versionData.funky) {
      tagBuilder+='Funky, '
    }
     if (props.versionData.groovy) {
      tagBuilder+='Groovy, '
    }
     if (props.versionData.guest) {
      tagBuilder+='Guest, '
    }
     if (props.versionData.happy) {
      tagBuilder+='Happy, '
    }
     if (props.versionData.heavy) {
      tagBuilder+='Heavy, '
    }
     if (props.versionData.jazzy) {
      tagBuilder+='Jazzy, '
    }
    if (props.versionData.long) {
      tagBuilder+='Long, '
    }
    if (props.versionData.multi_part) {
      tagBuilder+='Multi-part, '
    }
    if (props.versionData.official_release) {
      tagBuilder+='Official release, '
    }
     if (props.versionData.peaks) {
      tagBuilder+='Peaks, '
    }
     if (props.versionData.reggae) {
      tagBuilder+='Reggae, '
    }
    if (props.versionData.segue) {
      tagBuilder+='Segue, '
    }
     if (props.versionData.shred) {
      tagBuilder+='Shred, '
    }
    if (props.versionData.silly) {
     tagBuilder+='Silly, '
   }
    if (props.versionData.sloppy) {
      tagBuilder+='Sloppy, '
    }
    if (props.versionData.slow) {
     tagBuilder+='Slow, '
   }
    if (props.versionData.sludgy) {
      tagBuilder+='Sludgy, '
    }
    if (props.versionData.soaring) {
      tagBuilder+='Soaring, '
    }
    if (props.versionData.soulful) {
      tagBuilder+='Soulful, '
    }
    if (props.versionData.stop_start) {
      tagBuilder+='Stop-start, '
    }
    if (props.versionData.synthy) {
      tagBuilder+='Synthy, '
    }
     if (props.versionData.tease) {
      tagBuilder+='Teases, '
    }
    if (props.versionData.that_years_style) {
      tagBuilder+='That year\'s style, '
    }
     if (props.versionData.trippy) {
      tagBuilder+='Trippy, '
    }
     if (props.versionData.type2) {
      tagBuilder+='Type\u00A0II, '
    }
    if (props.versionData.unusual) {
      tagBuilder+='Unusual, '
    }
    let finalTags = tagBuilder.slice(0, tagBuilder.length - 2)
    setTags(finalTags)
    // if (!props.versionData.name || !props.versionData.points) {
    //   async function getNameAndPoints() {
    //     const { data, error } = await supabase
    //       .from('profiles')
    //       .select('points')
    //       .eq('name', props.versionData.submitter_name)
    //     if (error) {
    //       console.log('error getting points', error)
    //     } else {
    //       props.addPointsToVersion(props.versionData.id, data[0].points)
    //     }
    //   } getNameAndPoints()
    // }
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