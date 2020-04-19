import { Fragment, useState, useEffect } from 'react'
import { getData } from '../../utils/fetch'
import SimpleEntryForm from '../../components/simple-entry-form'

const PostsIndex = () => {
  const [data, setData] = useState({ posts: [], loading: true })
  const updateData = params => setData({...data, ...params})
  const { posts, loading } = data

  // If posts need to be refreshed, e.g. after a CRUD operation, call this function again
  const updatePosts = () => {
    console.log("Updating posts")

    updateData({ loading: true })

    return getData("/api/posts", {method: 'GET'})
      .then(data => {
        const { posts } = data
        updateData({posts, loading: false})
      })
  }
  
  useEffect(() => {
    updatePosts()
  }, [1])
  
  return <Fragment>
    <SimpleEntryForm disabled={loading} onCreate={() => updateData()} />

    {loading && <div>Loading...</div>}
    {posts.map(post => <div key={post.cuid} className="admin-post">
      <div>{post.title}</div>
    </div>)}
  </Fragment>
}

export default PostsIndex