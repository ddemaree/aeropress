import Head from 'next/head'
import { useState } from 'react'
import { postData } from '../../utils/fetch'

const LoginPage = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    error: null,
    isLoading: false
  })
  
  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    const { username, password } = state
    
    setState({ ...state, isLoading: true, password: '' })
    postData('/api/authorize', { username, password })
      .then(data => {
        console.log(data)
        if(data.error) {
          setState({ ...state, error: data.error, isLoading: false })  
        }
        setState({ ...state, error: null, isLoading: false })
    })
  }
  
  return <div>
    <Head>
      <title>Aeropress Login</title>
    </Head>
    <form onSubmit={handleSubmit}>
      {state.error && <div className="bg-pink">{state.error}</div>}
      <div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} value={state.username} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" placeholder="------" onChange={handleChange} value={state.password} />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  </div>
}

export default LoginPage