import {Router} from 'express'
import orderModel from '../models/order.model.js'
const router = Router()

//Rutas orders Operaciones sobre ordenes

router.get('/', async (req, res) => {
  console.log("Lista ordenes")
  const orden = await orderModel.find().lean().exec()
  res.send(orden)
})

router.post('/', async (req, res) => {
  console.log("Crear order")
  // si no hay name o no hay price retorna 400 y el objeto error
  if (!req.body.products || req.body.products.length==0) return res.status(400).send({
    "error": "string"
  });
  // creo el objeto nuevaOrder para insertar al arreglo de objetos
  const nuevaOrder = {
    "client": req.body.client,
    "products": req.body.products,
    "status": req.body.status,
    "dateEntry": req.body.dateEntry,
    "dateProcessed": req.body.dateProcessed,
  }

  const ordenGenerado = new orderModel(nuevaOrder)
  // guardo en la BD de mongoDB
  try {
    await ordenGenerado.save()
    // respondo al nuevo order
    res.send(nuevaOrder)
  } catch (error) {
    console.error('Error al guardar la orden:', error);
    res.status(500).send({"error": "string" });
  }
})

router.get('/:uid', async (req, res) => {
  console.log("Obtiene informacion de una Orden")
  // obtenemos el id del url Request
  const id = req.params.uid
  // traigo el elemento que coincida el id con el id del arreglo de objetos de ordenes 
  const order = await orderModel.findOne({ id }).lean().exec()
  // si no lo encuentra envia mensaje de error
  if (!order) return res.status(404).send({
    "error": "string"
  });
  res.send(order)
})
router.patch('/:uid',async(req, res) => {
  console.log("Modifica una orden")
  // si no hay status nos da error de mal hecha la petición
  if (!req.body.status ) return res.status(400).send({
    "error": "string"
  });
    // obtenemos el id del url Request
    const id = req.params.uid
    try {
      const result = await orderModel.updateOne({ id }, { ...req.body })
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
      console.log(`error actualizando: ${err}`)
      // retorno 500 si hay otro problema talvez con el mongoDB
      res.status(500).send({
        "error": "string"
      });
    }
})

router.delete('/:uid', async (req, res) => {
    // obtenemos el id del url orders
    const id = req.params.uid
    try {
      // eliminando usuario por id
      const respuesta = await orderModel.deleteOne({ id })
      console.log(respuesta)
      //deleteCount = conteo de borrados
      // si el conteo de borrados es 0 entonces retorno 404 no encontrado
      if (!respuesta.deletedCount) return res.status(404).send({
        "error": "string"
      });
      res.send("orden eliminada")
    } catch (err) {
      console.log(`error: ${err}`)
      return res.status(500).send({
        "error": "string"
      });
    }
})

export default router