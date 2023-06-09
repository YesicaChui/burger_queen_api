import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY

export const generateToken = user => {
  // firmando token y especificando tiempo de expiracion
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
  return token
}

export const authToken = (req, res, next) => {
  //const token = req.headers.authorization
  const token = req.headers.authorization.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : req.headers.authorization
  if (!token) return res.status(401).json({ "error": "string" })
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    console.log(credentials)
    if (error) return res.status(401).json({ "error": "string" })
    req.user = credentials.user
    next()
  })
}

export const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// user es de la Base de datos y password es el que ingresas
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}