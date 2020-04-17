import { Post } from '../../models'

export default async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const post = await Post.create({title: 'Post title', meta: {hello: 'world'}})
    res.status(200).json({ name: `Created post with ID ${post.id} ${post.cuid}` })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'Next.js posts/index' })
  }
}