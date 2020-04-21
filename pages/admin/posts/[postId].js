import { useRef, useEffect, useState } from 'react'
import c from 'classnames'

const ExpandoTextArea = ({ value, placeholder, className, onChange }) => {
  const textareaRef = useRef(null)
  const [fieldValue, setFieldValue] = useState(value || '')

//   useEffect(() => { 
//   }, [])
  
  const handleChange = e => {
    console.log(e.target.value, e.target.offsetHeight)
    
    if(typeof onChange === 'function') onChange(e)
  }
  
  return <textarea 
    className={c('bg-gray-100 text-gray-900 text-4xl py-3 px-3 w-full mx-auto text-center', className)}
    ref={textareaRef}
    placeholder={placeholder}
    style={{overflow: 'hidden', overflowWrap: 'break-word', resize: 'none'}}
    onChange={handleChange}>{value}</textarea>
}


const EditView = () => {
  return <div className="max-w-4xl mx-auto">
    <h1>Edit post</h1>
    <ExpandoTextArea placeholder="Add title" />
  </div>
}

export default EditView