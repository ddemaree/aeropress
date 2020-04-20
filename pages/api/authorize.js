import { User } from '../../models'

export default async (req, res) => {
  if (req.method === 'POST') {
    res.status(200).json({ msg: "hello there" })
    
  }
  else {
    res.status(404).json({ msg: "Not sure what yr doing here" })
  }
}