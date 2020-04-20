import { useState } from 'react'
import { postData } from '../../utils/fetch'

const LoginPage = () => {
  const [state, setState] = useState({
    isLoading: false
  })
  
  const handleSubmit = e => {
    e.preventDefault()
    setState({ ...state, isLoading: true })
    postData('/api/authorize', {username: 'melody', password: 'nelson'})
      .then(data => {
        console.log(data)
        setState({ ...state, isLoading: false })  
    })
  }
  
  return <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" placeholder="------" />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  </div>
}

export default LoginPage