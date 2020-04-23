import { useRef, useEffect, useState, Fragment } from 'react'
import c from 'classnames'

const ExpandoTextArea = ({ value, placeholder, className, onChange }) => {
  const textareaRef = useRef(null)
  const phantomRef = useRef(null)
  const [fieldValue, setFieldValue] = useState(value || '')
  const [fieldHeight, setFieldHeight] = useState(122)
  
  // This is hard-coded, may want to make it computed based on styles[line-height] below
  const MINIMUM_HEIGHT = 74
  
  const updateTextareaHeight = () => {
    const phantomHeight = phantomRef.current.offsetHeight
    const newHeight = phantomHeight > MINIMUM_HEIGHT ? phantomHeight : MINIMUM_HEIGHT
    setFieldHeight(newHeight)
  }
  
  useEffect(() => {
    updateTextareaHeight()
  }, [fieldValue])
  
  useEffect(() => {
    const onResize = () => { updateTextareaHeight() }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize) }
  }, [])
  
  const handleChange = e => {
    const newTitle = e.target.value
    setFieldValue(newTitle)
    if(typeof onChange === 'function') onChange(newTitle)
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

export default ExpandoTextArea