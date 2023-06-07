import {Router} from 'express'
import { db } from '../data/db.js'
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
  // retorno un access token statico en este sprint
  // retorno el access token y los datos del usuario
  res.send({
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "users": db.users[validarUsuario]
  })
})

export default router