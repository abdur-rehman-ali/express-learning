import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1]
      const { userID } = jwt.verify(token, process.env.SECRET_KEY)
      req.user = await User.findById(userID).select('-password')
      next()
    } else {
      res.status(401).send({ status: "failed", message: "Missing auth token" })
    }
  } catch (error) {
    res.send({ status: "failed", message: error.message })
  }


}
export default authMiddleware
