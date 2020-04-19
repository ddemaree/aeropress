const SimpleEntryForm = () => {
  
  const [values, setValues] = useState({title: ''})

  const handleChange = name =>
    e => {
      const fieldValue = { [name]: e.target.value }
      const newValues = { ...values, ...fieldValue }
      setValues(newValues)
    }
  
  const handleSubmit = e => {
    e.preventDefault()
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setValues({title: ''})
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