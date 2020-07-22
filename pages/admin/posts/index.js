import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { getData } from '../../../utils/fetch'

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
    <div className="bg-gray-800 text-white p-2">
      Toolbar
    </div>
    <div className="px-3 my-4 mx-auto max-w-4xl">

    <div className="flex my-4">
      <div className="flex-1 bg-red-200">
        Filter bar on post status
      </div>
      <Link href="/admin/posts/new"><a className="ap-button">New Post</a></Link>
    </div>

    <div className="ap-posts-table border-solid border-b-2 border-gray-400">
      <div className="ap-headers p-2 flex font-bold">
        <div className="flex-1">Title</div>
        <div className="">Status</div>
      </div>
      {posts.map(post => <div key={post.cuid} className="ap-admin-post flex border-solid border-t-2 border-gray-400 p-2 hover:bg-gray-200">
        <div className="flex-1">
          <Link href="/admin/posts/[postId]" as={`/admin/posts/${post.cuid}`}><a className="text-blue-600 font-medium">{post.title}</a></Link>
        </div>
        <div className="text-right">
          <span className="bg-red-500 text-white uppercase rounded-full px-2 py-1 text-xs">{post.status || "draft"}</span>
          <div className="text-xs mt-1 text-gray-600">Last saved YYYY-MM-DD</div>
        </div>
      </div>)}
    </div>
    </div>
    
    {loading && <div>Loading...</div>}
  </Fragment>
}

export default PostsIndex