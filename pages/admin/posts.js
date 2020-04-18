import { useState, useEffect } from 'react'

const PostsIndex = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // If 
  const updatePosts = () => {
    setLoading(true)
    return fetch("/api/posts", {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts)
        setLoading(false)
      })
  }
  
  useEffect(() => {
    updatePosts()
  }, [1])
  
  return <div>
    {loading && <div>Loading...</div>}
    {!loading && posts.map(post => <div key={post.id} className="admin-post">
      <div>{post.title}</div>
    </div>)}
  </div>
}

export default PostsIndex