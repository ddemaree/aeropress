// import { Post } from '../../models'
import { Post } from '../../models'

export default (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    console.log(req)
    Post.create({title: 'Post title', meta: {hello: 'world'}})
      .then(post => {
          console.log(post)
          res.status(200).json({ name: `Created post with ID ${post.id} ${post.cuid}` })
        })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'Next.js posts/index' })
  }
}