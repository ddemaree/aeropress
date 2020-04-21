import { useRef, useEffect, useState, Fragment } from 'react'
import c from 'classnames'

const ExpandoTextArea = ({ value, placeholder, className, onChange }) => {
  const textareaRef = useRef(null)
  const phantomRef = useRef(null)
  const [fieldValue, setFieldValue] = useState(value || '')
  const [fieldHeight, setFieldHeight] = useState(122)

  const updateTextareaHeight = () => {
    
  }
  
  useEffect(() => {
    console.log(phantomRef.current.offsetHeight)
    
    setFieldHeight(phantomRef.current.offsetHeight)
  }, [fieldValue])
  
  const handleChange = e => {
    console.log(e.target.value)
    setFieldValue(e.target.value)
    
    if(typeof onChange === 'function') onChange(e)
  }
  
  const defaultClasses = 'bg-gray-100 text-gray-900 text-4xl py-3 px-3 w-full mx-auto text-center leading-snug'
  
  return <Fragment>
    <textarea 
      className={c(defaultClasses, className)}
      ref={textareaRef}
      placeholder={placeholder}
      style={{overflow: 'hidden', overflowWrap: 'break-word', resize: 'none', height: fieldHeight}}
      onChange={handleChange}
      value={fieldValue} />
    <div style={{height: 0, position: 'relative', overflow: 'hidden'}}>
      <div
        ref={phantomRef}
        className={c(defaultClasses)}
        style={{overflow: 'hidden', opacity: 0.3}}
        aria-hidden={true}>{fieldValue}</div>
    </div>
  </Fragment>
}


const EditView = () => {
  return <div className="max-w-4xl mx-auto">
    <h1>Edit post</h1>
    <ExpandoTextArea placeholder="Add title" value="When the Pawn Hits the Conflicts He Thinks Like a King What He Knows Throws the Blows When He Goes to the Fight and He'll Win the Whole Thing 'fore He Enters the Ring" />
    
    <div>Rich text editor here!!!</div>
  </div>
}

export default EditView