import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const PRIVATE_KEY = 'yesi'

export const generateToken = user => {
  // firmando token y especificando tiempo de expiracion
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
  return token
}

export const authToken = (req, res, next) => {
  console.log("leyendo valores")
  console.log(req.headers)
  console.log("fin lectura")
  //const token = req.headers.authorization
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({  "error": "string" })
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(401).json({  "error": "string" })
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