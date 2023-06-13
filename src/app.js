// configuración de express
import express, { json, urlencoded } from 'express'

import login from './routers/login.route.js'
import users from './routers/user.route.js'
import products from './routers/product.route.js'
import orders from './routers/orders.route.js'
import { authToken } from './utils/utils.js'
import mongoose from 'mongoose'
import cors from 'cors'
const uri = 'mongodb://localhost:27017'
const app = express()
//https://www.geeksforgeeks.org/express-js-express-json-function/
// leer json
app.use(json())
app.use(cors())
// genero mis rutas
app.get('/', (req, res) => {
  res.send(`
    <body>
    <header>
      <h1>Bienvenidos al servidor de Burger Queen</h1>
    </header>
    <main>
      <p>Se implementara las rutas de la siguiente documentacion</p>
      <a href="https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0">documentacion rutas burger Queen Api</a>
    </main>
    <footer>
      <p>Autor: Yesica Chui</p>
    </footer>
  </body>
  `)
})

//configuración de rutas
app.use('/login',login)
// protejo las rutas siguiente para que pasen por el midleware
app.use(authToken)
app.use('/users',users)
app.use('/products',products)
app.use('/orders',orders)
try{
  // conexion a la base de datos
  await mongoose.connect(uri, {
    //nombre de la base de datos
    dbName: 'burgerQueenAPI_DB'
  })
  app.listen(3000, () => {
    console.log('Ready')
  })
}catch(error){
  console.log('hubo un error')
}


// inicio el servidor en el puerto 3000
