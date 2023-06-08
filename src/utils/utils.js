import jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'yesi'

export const generateToken = user => {
  // firmando token y especificando tiempo de expiracion
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
  return token
}

export const authToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({  "error": "string" })
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(401).json({  "error": "string" })
    req.user = credentials.user
    next()
  })
}