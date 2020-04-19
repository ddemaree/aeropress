import { Fragment, useState, useEffect } from 'react'
import { getData } from '../../utils/fetch'
import SimpleEntryForm from '../../components/simple-entry-form'

const PostsIndex = () => {
  const [data, setData] = useState({ posts: [], loading: true })
  const updateData = params => setData({...data, ...params})
  const { posts, loading } = data

  // If posts need to be refreshed, e.g. after a CRUD operation, call this function again
  const loadPosts = (cancelled = false) => {
    if(!cancelled) updateData({ loading: true })

    return getData("/api/posts", { method: 'GET' })
      .then(serverData => {
        if(!cancelled) updateData({posts: serverData.posts, loading: false})
      })
  }
  
  useEffect(() => {
    let cancelled = false
    loadPosts(cancelled)
    return () => { cancelled = true }
  }, [])
  
  return <Fragment>
    <SimpleEntryForm disabled={loading} onCreate={() => {
      loadPosts().then(() => console.log("Posts updated"))
    }} />

    {posts.map(post => <div key={post.cuid} className="admin-post">
      <div>{post.title}</div>
    </div>)}
    
    {loading && <div>Loading...</div>}
  </Fragment>
}

export default PostsIndex