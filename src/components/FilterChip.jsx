import { useState, useEffect } from 'react'

function FilterChip (props) {

  let [className, setClassName] = useState('filter-chip empty')

  useEffect(() => {
    if (props.currentFilterState) {
      setClassName('filter-chip full')
    } else {
      setClassName('filter-chip empty')
    }
  }, [props.currentFilterState])

  return (
      <button className={className}
      onClick={e => props.setFilter(!props.currentFilterState)}>{props.text}</button>
  )
}

export default FilterChip