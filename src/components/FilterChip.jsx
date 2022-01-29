import { useState, useEffect, useRef } from 'react'
import { supabase } from './../supabaseClient'

function FilterChip (props) {
  let [classNameEmpty, setClassNameEmpty] = useState('filter-chip empty')
  let [classNameFull, setClassNameFull] = useState('filter-chip full')
  let [classNameToUse, setClassNameToUse] = useState(classNameEmpty)

  useEffect(() => {
    if (props.currentFilterState) {
      setClassNameToUse(classNameFull)
    } else {
      setClassNameToUse(classNameEmpty)
    }
  }, [props, classNameEmpty, classNameFull])

  return (
      <button className={classNameToUse}
      onClick={e => props.setFilter(!props.currentFilterState)}>{props.text}</button>
  )
}

export default FilterChip