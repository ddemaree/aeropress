import { Post } from '../../models'
import { omit } from 'lodash'

export default async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const { title } = req.body

    const post = await Post.create({ title, meta: {hello: 'world'} })
    res.status(201).json({ message: `Created post with ID ${post.id} ${post.cuid}`, post: { id: post.id, cuid: post.cuid } })
  } else {
    
    const { count, rows } = await Post.findAndCountAll({ limit: 50, offset: 0})
    const posts = rows.map(row => omit(row.toJSON(), ['id']))

    // Handle any other HTTP method
    res.status(200).json({ count, posts })
  }
}