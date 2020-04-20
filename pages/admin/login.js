import Head from 'next/head'
import { useState, useContext } from 'react'
import { postData } from '../../utils/fetch'
import { AuthContext } from '../../components/auth-provider'

const LoginPage = () => {
  const { state, dispatch } = useContext(AuthContext)
  console.log(state)

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    error: null,
    isLoading: false
  })
  const { username, password, isLoading, error } = formState
  
  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setFormState({ ...formState, [name]: value })
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    
    setFormState({ ...state, isLoading: true, password: '' })
    postData('/api/authorize', { username, password })
      .then(data => {
        console.log(data)
        if(data.error) {
          setFormState({ ...formState, error: data.error, isLoading: false, password: '' })  
        } else {
          setFormState({ ...formState, error: null, isLoading: false })          
        }
    })
  }
  
  return <div>
    <Head>
      <title>Aeropress Login</title>
    </Head>
    <form onSubmit={handleSubmit}>
      {error && <div className="bg-red-100">{error}</div>}
      <div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} value={username} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" placeholder="------" onChange={handleChange} value={password} />
      </div>
      <div>
        <button type="submit" disabled={isLoading}>{isLoading ? "Logging in...": "Log In"}</button>
      </div>
    </form>
  </div>
}

export default LoginPage