// configuración de express
import express, { json, urlencoded } from 'express'
import { db } from './db.js'
const app = express()

//https://www.geeksforgeeks.org/express-js-express-json-function/
// leer json
app.use(json())

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
// auth Operaciones de autenticacion
// ruta de login 
app.post('/login', (req, res) => {
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
//-------

//Rutas Users Operaciones sobre usuarias
app.get('/users', (req, res) => {
  // falta validar que envien un token valido
  console.log("Lista usuarias")
  res.send(db.users)
})

app.post('/users', (req, res) => {
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
  const idMayor = db.users.reduce((acumulador, elemento) => acumulador < elemento.id ? elemento.id : acumulador, 1)
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

app.get('/users/:uid', (req, res) => {
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
app.patch('/users/:uid', (req, res) => {
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

app.delete('/users/:uid', (req, res) => {
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

// inicio el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Ready')
})