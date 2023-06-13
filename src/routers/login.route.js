import { Router } from 'express'
import { generateToken } from '../utils/utils.js'
import userModel from '../models/user.model.js'
import { isValidPassword } from '../utils/utils.js'

const router = Router()

router.post('/', async (req, res) => {
  console.log(req.body)
  const email = req.body.email
  const password = req.body.password
  // si no hay email o no hay password retorna 400 y el objeto error
  if (!email || !password) return res.status(400).send({
    "error": "string"
  });

  // traigo el elemento que coincida el email con el id de MongoDB
  const user = await userModel.findOne({ email }).lean().exec()
  // si no lo encuentra envia mensaje de error
  if (!user) return res.status(404).send({
    "error": "string"
  });

  // valido si la contraseña ingresada es valida comparandola con el de la BD
  // usando bcrypt para compararla con la contraseña encriptada
  if (!isValidPassword(user, password)) return res.status(404).send({
    "error": "string"
  });


  const accessToken = generateToken(user)
  // retorno un access token statico en este sprint
  // retorno el access token y los datos del usuario
  res.send({
    accessToken,
    "users": user
  })
})

router.post('/admin', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // si no hay email o no hay password retorna 400 y el objeto error
  if (!email || !password) return res.status(400).send({
    "error": "string"
  });

  if (email != process.env.DB_USER || password != process.env.DB_PASSWORD) return res.status(404).send({
    "error": "string"
  });

  const user = {
    "admin": email,
    "password": password
  }

  const accessToken = generateToken(user)
  // retorno un access token statico en este sprint
  // retorno el access token y los datos del usuario
  res.send({
    accessToken
  })
})

export default router