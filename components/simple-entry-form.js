import { useState } from 'react'
import { postData } from '../utils/fetch'

const SimpleEntryForm = ({ disabled, onCreate }) => {
  const [values, setValues] = useState({title: ''})
  
  const handleChange = name =>
    e => {
      const fieldValue = { [name]: e.target.value }
      const newValues = { ...values, ...fieldValue }
      setValues(newValues)
    }
  
  const handleSubmit = e => {
    e.preventDefault()
    postData('/api/posts', values)
      .then(data => {
        console.log(data)
        setValues({title: ''})
      
        if(typeof onCreate === 'function') {
          console.log("Running onCreate callback")
          onCreate()
        }
      })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label>Title</label>
      <input type="text" value={values.title} onChange={handleChange('title')} />
    </div>
    <button type="submit">Create post</button>
  </form>
}

export default SimpleEntryForm