import {Router} from 'express'
import { db } from '../data/db.js'
const router = Router()

//Rutas Users Operaciones sobre usuarias
router.get('/', (req, res) => {
  // falta validar que envien un token valido
  console.log("Lista usuarias")
  res.send(db.users)
})

router.post('/', (req, res) => {
  console.log("Crear Usuaria")
  // si no hay email o no hay password retorna 400 y el objeto error
  if (!req.body.email || !req.body.password) return res.status(400).send({
    "error": "string"
  });
  //verifico si ya existe usuaria con ese email
  const user = db.users.find(elemento => elemento.email == req.body.email)
  // si lo encuentra envia mensaje de error
  if (user) return res.status(404).send({
    "error": "string"
  });
  //crear el id --> buscaremos el mayor id de usuarios y le aumentaremos 1
  const idMayor = db.users.reduce((acumulador, elemento) => acumulador < elemento.id ? elemento.id : acumulador, 0)
  // creo el objeto nuevoUsuario para insertar al arreglo de objetos
  const nuevoUsuario = {
    "email": req.body.email,
    "password": req.body.password,
    "role": req.body.role,
    "id": idMayor+1
  }
  // inserto al nuevoUsuario
  db.users.push(nuevoUsuario)
  // respondo al nuevo usuario
  res.send(nuevoUsuario)
})

router.get('/:uid', (req, res) => {
  console.log("Obtiene informacion de una usuaria")
  // obtenemos el id del url Request
  const id = req.params.uid
  // traigo el elemento que coincida el id con el id del arreglo de objetos de usuario 
  const user = db.users.find(elemento => elemento.id == id)
  // si no lo encuentra envia mensaje de error
  if (!user) return res.status(404).send({
    "error": "string"
  });
  res.send(user)
})
router.patch('/:uid', (req, res) => {
  console.log("Modifica una usuaria")
    // obtenemos el id del url Request
    const id = req.params.uid
    // traigo el elemento que coincida el id con el id del arreglo de objetos de usuario 
    const indiceUsuario = db.users.findIndex(elemento => elemento.id == id)
    // si no lo encuentra envia mensaje de error
    if (indiceUsuario==-1) return res.status(404).send({
      "error": "string"
    });
    db.users[indiceUsuario]={
      ...db.users[indiceUsuario],
      ...req.body
    }   

  res.send("Modifica una usuaria")
})

router.delete('/:uid', (req, res) => {
    // obtenemos el id del url Request
    const id = req.params.uid
    // traigo el elemento que coincida el id con el id del arreglo de objetos de usuario 
    const indiceUsuario = db.users.findIndex(elemento => elemento.id == id)
    // si no lo encuentra envia mensaje de error
    if (indiceUsuario==-1) return res.status(404).send({
      "error": "string"
    });
    db.users.splice(indiceUsuario,1)
  res.send("usuaria eliminada")
})

export default router