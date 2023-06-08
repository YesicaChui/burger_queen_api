import {Router} from 'express'
import { db } from '../data/db.js'
import productModel from '../models/product.model.js'
import moment from 'moment';
import 'moment-timezone';
const router = Router()

//Rutas products Operaciones sobre productos
router.get('/', (req, res) => {
  console.log("Lista productos")
  res.send(db.products)
})

router.post('/', async (req, res) => {
  console.log("Crear producto")
  // si no hay name o no hay price retorna 400 y el objeto error
  if (!req.body.name || !req.body.price) return res.status(400).send({
    "error": "string"
  });
// Obtener la fecha y hora actual en la zona horaria de Perú
const fechaHoraActual = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
   // creo el objeto nuevoProducto para insertar al arreglo de objetos
  const nuevoProducto = {
    "name":  req.body.name,
    "price": req.body.price,
    "image": req.body.image,
    "type": req.body.type,
    "dateEntry": fechaHoraActual,
  }
  // inserto al nuevoProducto
  const productoGenerado = new productModel(nuevoProducto)
  // guardo en la BD de mongoDB
  try {
    await productoGenerado.save()
    // respondo al nuevo usuario
    res.send(nuevoProducto)
  } catch (error) {
    console.error('Error al guardar producto:', error);
    res.status(500).send({"error": "string" });
  }
})

router.get('/:uid', (req, res) => {
  console.log("Obtiene informacion de un producto")
  // obtenemos el id del url Request
  const id = req.params.uid
  // traigo el elemento que coincida el id con el id del arreglo de objetos de productos 
  const product = db.products.find(elemento => elemento.id == id)
  // si no lo encuentra envia mensaje de error
  if (!product) return res.status(404).send({
    "error": "string"
  });
  res.send(product)
})
router.patch('/:uid', (req, res) => {
  console.log("Modifica un producto")
    // obtenemos el id del url Request
    const id = req.params.uid
    // traigo el elemento que coincida el id con el id del arreglo de objetos de productos 
    const indiceProducto = db.products.findIndex(elemento => elemento.id == id)
    // si no lo encuentra envia mensaje de error
    if (indiceProducto==-1) return res.status(404).send({
      "error": "string"
    });
    db.products[indiceProducto]={
      ...db.products[indiceProducto],
      ...req.body
    }   

  res.send("Modifica un producto")
})

router.delete('/:uid', (req, res) => {
    // obtenemos el id del url Request
    const id = req.params.uid
    // traigo el elemento que coincida el id con el id del arreglo de objetos de productos 
    const indiceProducto = db.products.findIndex(elemento => elemento.id == id)
    // si no lo encuentra envia mensaje de error
    if (indiceProducto==-1) return res.status(404).send({
      "error": "string"
    });
    // uso Splice para quitar un producto
    db.products.splice(indiceProducto,1)
  res.send("producto eliminado")
})

export default router