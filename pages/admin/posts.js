import { useState, useEffect } from 'react'

const PostsIndex = ({ }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/posts", {method: 'GET'})
      .then(response => response.json())
      .then(data => {
      
    })
  })
  
  return <div>
    
  </div>
}

export default PostsIndex