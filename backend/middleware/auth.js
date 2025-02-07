import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(400).json({ message: "Access denied..!" })

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid token..!" })
  }
}

export default authMiddleware;