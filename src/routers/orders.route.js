import {Router} from 'express'
import { db } from '../data/db.js'
import orderModel from '../models/order.model.js'
const router = Router()

//Rutas orders Operaciones sobre ordenes

router.get('/', async (req, res) => {
  // falta validar que envien un token valido
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
    "dateEntry": req.body.dateEntry
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

router.get('/:uid', (req, res) => {
  console.log("Obtiene informacion de una Orden")
  // obtenemos el id del url Request
  const id = req.params.uid
  // traigo el elemento que coincida el id con el id del arreglo de objetos de ordenes 
  const order = db.orders.find(elemento => elemento.id == id)
  // si no lo encuentra envia mensaje de error
  if (!order) return res.status(404).send({
    "error": "string"
  });
  res.send(order)
})
router.patch('/:uid', (req, res) => {
  console.log("Modifica una orden")
  // si no hay status nos da error de mal hecha la petición
  if (!req.body.status ) return res.status(400).send({
    "error": "string"
  });
    // obtenemos el id del url Request
    const id = req.params.uid
    // traigo el elemento que coincida el id con el id del arreglo de objetos de ordenes 
    const indiceOrden = db.orders.findIndex(elemento => elemento.id == id)
    // si no lo encuentra envia mensaje de error
    if (indiceOrden==-1) return res.status(404).send({
      "error": "string"
    });
    db.orders[indiceOrden]={
      ...db.orders[indiceOrden],
      ...req.body
    }   

  res.send("Modifica una orden")
})

router.delete('/:uid', (req, res) => {
    // obtenemos el id del url orders
    const id = req.params.uid
    // traigo el elemento que coincida el id con el id del arreglo de objetos de orders 
    const indiceOrder = db.orders.findIndex(elemento => elemento.id == id)
    // si no lo encuentra envia mensaje de error
    if (indiceOrder==-1) return res.status(404).send({
      "error": "string"
    });
    // uso Splice para quitar un Orden
    db.orders.splice(indiceOrder,1)
  res.send("Orden eliminada")
})

export default router