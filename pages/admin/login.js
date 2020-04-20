import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { postData } from '../../utils/fetch'
import { AuthContext, loginUser } from '../../components/auth-provider'

const LoginPage = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(AuthContext)

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
    
    setFormState({ ...state, isLoading: true })
    postData('/api/authorize', { username, password })
      .then(data => {
        console.log(data)
        if(data.error) {
          setFormState({ ...formState, error: data.error, isLoading: false })  
        } else {
          dispatch(loginUser(data.token, data.user))
          setFormState({ ...formState, error: null, isLoading: false })     
          router.push("/admin/posts")
        }
    })
  }
  
  return <div>
    <Head>
      <title>Aeropress Login</title>
    </Head>
    {state.authToken && <div>Logged in as {state.authToken}</div>}
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