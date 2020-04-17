import { Post } from '../../models'

export default async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const { title } = req.body

    const post = await Post.create({ title, meta: {hello: 'world'} })
    res.status(201).json({ message: `Created post with ID ${post.id} ${post.cuid}`, post: { id: post.id, cuid: post.cuid } })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'Next.js posts/index' })
  }
}