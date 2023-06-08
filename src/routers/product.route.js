import {Router} from 'express'
import productModel from '../models/product.model.js'
import moment from 'moment';
import 'moment-timezone';
const router = Router()

//Rutas products Operaciones sobre productos
router.get('/', async (req, res) => {
  console.log("Lista productos")
  const product = await productModel.find().lean().exec()
  res.send(product)
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
    // respondo al nuevo producto
    res.send(nuevoProducto)
  } catch (error) {
    console.error('Error al guardar producto:', error);
    res.status(500).send({"error": "string" });
  }
})

router.get('/:uid', async (req, res) => {
  console.log("Obtiene informacion de un producto")
  // obtenemos el id del url Request
  const id = req.params.uid
  // traigo el elemento que coincida el id con el id del arreglo de objetos de productos 
  const product = await productModel.findOne({ id }).lean().exec()
  // si no lo encuentra envia mensaje de error
  if (!product) return res.status(404).send({
    "error": "string"
  });
  res.send(product)
})
router.patch('/:uid', async (req, res) => {
  console.log("Modifica un producto")
    // obtenemos el id del url Request
    const id = req.params.uid
    try {
      const result = await productModel.updateOne({ id }, { ...req.body })
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
    // obtenemos el id del url Request
    const id = req.params.uid
    try {
      // eliminando usuario por id
      const respuesta = await productModel.deleteOne({ id })
      console.log(respuesta)
      //deleteCount = conteo de borrados
      // si el conteo de borrados es 0 entonces retorno 404 no encontrado
      if (!respuesta.deletedCount) return res.status(404).send({
        "error": "string"
      });
      res.send("producto eliminado")
    } catch (err) {
      console.log(`error: ${err}`)
      return res.status(500).send({
        "error": "string"
      });
    }
})

export default router