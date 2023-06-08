import { Router } from 'express'
import userModel from '../models/user.model.js'
import { createHash } from '../utils/utils.js'
const router = Router()

//Rutas Users Operaciones sobre usuarias
router.get('/', async (req, res) => {
  console.log("Lista usuarias")
  // find nos trae todos los datos del modelo usuario y lean hace que se vuelva el formato de arreglo de objetos
  // y con exec se ejecuta
  const users = await userModel.find().lean().exec()
  res.send(users)
})

router.post('/', async (req, res) => {
  console.log("Crear Usuaria con mongodb")
  // si no hay email o no hay password retorna 400 y el objeto error
  if (!req.body.email || !req.body.password) return res.status(400).send({
    "error": "string"
  });
  const email = req.body.email
  //verifico si ya existe usuaria con ese email
  const user = await userModel.findOne({ email }).lean().exec()
  // si no lo encuentra envia mensaje de error
  if (user) return res.status(403).send({
    "error": "string"
  });
   // creo el objeto nuevoUsuario para insertar al arreglo de objetos
  const nuevoUsuario = {
    "email": req.body.email,
    "password": createHash(req.body.password),
    "role": req.body.role,
  }
  // inserto al nuevoUsuario
  // le entrego los datos a insertar al modelo Usuario
  const usuarioGenerado = new userModel(nuevoUsuario)
  // guardo en la BD de mongoDB
  try {
    await usuarioGenerado.save()
    // respondo al nuevo usuario
    res.send(nuevoUsuario)
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).send({"error": "string" });
  }

})

router.get('/:uid', async (req, res) => {
  console.log("Obtiene informacion de una usuaria")
  // obtenemos el id del url Request
  const id = req.params.uid
  // traigo el elemento que coincida el id con el id de MongoDB
  const user = await userModel.findOne({ id }).lean().exec()
  // si no lo encuentra envia mensaje de error
  if (!user) return res.status(404).send({
    "error": "string"
  });
  // si lo encuentro retorno el usuario
  res.send(user)
})

router.patch('/:uid', async (req, res) => {
  console.log("Modifica una usuaria")
  // obtenemos el id del url Request
  const id = req.params.uid
  try {
    const result = await userModel.updateOne({ id }, { ...req.body })
    // matchedCount = coincidencia encontrada
    console.log(result.matchedCount)
    // si no existe coincidencia con el id retorna 404
    if (!result.matchedCount) {
      return res.status(404).send({
        error: 'string'
      });
    }
    res.send({ ...req.body })
  } catch (err) {
    console.log(`error insertando: ${err}`)
    // retorno 500 si hay otro problema talvez con el mongoDB
    res.status(500).send({
      "error": "string"
    });
  }


})

router.delete('/:uid', async (req, res) => {
  // obtenemos el id del url Request
  const id = req.params.uid
  try {
    // eliminando usuario por id
    const respuesta = await userModel.deleteOne({ id })
    console.log(respuesta)
    //deleteCount = conteo de borrados
    // si el conteo de borrados es 0 entonces retorno 404 no encontrado
    if (!respuesta.deletedCount) return res.status(404).send({
      "error": "string"
    });
    res.send("usuaria eliminada")
  } catch (err) {
    console.log(`error: ${err}`)
    return res.status(500).send({
      "error": "string"
    });
  }
})

export default router