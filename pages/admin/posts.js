import { useState, useEffect } from 'react'

const PostsIndex = () => {
  const [data, setData] = useState({ posts: [], loading: true })
  const updateData = params => setData({...data, ...params})
  const { posts, loading } = data

  // If posts need to be refreshed, e.g. after a CRUD operation, call this function again
  const updatePosts = () => {
    updateData({ loading: true })

    return fetch("/api/posts", {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        const { posts } = data
        updateData({posts, loading: false})
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