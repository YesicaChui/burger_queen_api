import {Router} from 'express'
import { db } from '../data/db.js'
import { generateToken } from '../utils/utils.js'
const router = Router()

router.post('/', (req, res) => {
  console.log(req.body)
  // si no hay email o no hay password retorna 400 y el objeto error
  if (!req.body.email || !req.body.password) return res.status(400).send({
    "error": "string"
  });
  // busco en la BD si hay usuario que coincida su  email y password con el del request
  const validarUsuario = db.users.findIndex((elemento) => elemento.email == req.body.email && elemento.password == req.body.password)
  // si no lo encuentra retorno error
  if (validarUsuario == -1) return res.status(404).send({
    "error": "string"
  });
  const accessToken=generateToken(db.users[validarUsuario])
  // retorno un access token statico en este sprint
  // retorno el access token y los datos del usuario
  res.send({
    accessToken,
    "users": db.users[validarUsuario]
  })
})

export default router