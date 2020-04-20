import { User } from '../../models'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

const THE_SECRET = process.env.SECRET_KEY || "hard work and healthy food"

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body
    const user = await User.findOne({where: { email: username }})
    
    if(user && bcrypt.compareSync(password, user.password_digest)) {
      const token = jwt.sign({ id: user.cuid }, THE_SECRET)

      res.status(200).json({ success: true, token, user: user.toJSON() })
    } else {
      res.status(401).json({ error: "Could not authenticate user" })
    }
  }
  else {
    res.status(404).json({ error: "Not sure what yr doing here" })
  }
}