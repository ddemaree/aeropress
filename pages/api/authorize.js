import { User } from '../../models'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { omit } from 'lodash'

const THE_SECRET = process.env.SECRET_KEY || "hard work and healthy food"

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body
    const user = await User.findOne({where: { email: username }})
    
    if(user && bcrypt.compareSync(password, user.password_digest)) {
      const token = jwt.sign({ id: user.cuid }, THE_SECRET)

      const visibleUser = omit(user.toJSON(), ['password_digest', 'id'])
      
      res.status(200).json({ success: true, token, user: visibleUser })
    } else {
      res.status(401).json({ error: "Could not authenticate user" })
    }
  }
  else {
    res.status(404).json({ error: "Not sure what yr doing here" })
  }
}