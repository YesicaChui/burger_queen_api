import {Router} from 'express'
import { db } from '../data/db.js'
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
/*   // busco en la BD si hay usuario que coincida su  email y password con el del request
  const validarUsuario = db.users.findIndex((elemento) => elemento.email == req.body.email && elemento.password == req.body.password)
  // si no lo encuentra retorno error
  if (validarUsuario == -1) return res.status(404).send({
    "error": "string"
  }); */  

  // traigo el elemento que coincida el email con el id de MongoDB
  const user = await userModel.findOne({ email }).lean().exec()
  // si no lo encuentra envia mensaje de error
  if (!user) return res.status(404).send({
    "error": "string"
  });

  if(!isValidPassword(user, password)) return res.status(404).send({
    "error": "string"
  });


  const accessToken=generateToken(user)
  // retorno un access token statico en este sprint
  // retorno el access token y los datos del usuario
  res.send({
    accessToken,
    "users": user
  })
})

export default router