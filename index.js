const express = require ('express');
const conetcarDB = require('./config/db');
const cors = require('cors');
//config
const { API_NAME, API_VERSION } = require("./config");
// routes

// crear el servidor
const app = express();
//conectar a la base de datos
conetcarDB();
// habilitar Cors
console.log ( 'FrontEnd : ', process.env.FRONTEND_URL )
const opcionesCors = {
  origin: process.env.FRONTEND_URL
}
//
app.use( cors( opcionesCors ) );
// app port
const port = process.env.PORT || 3977;
// to read values from body
app.use( express.json() );
// app routes() 

// Start app
app.listen(port, '0.0.0.0', () => {
  console.log( `El servidor esta funcionando en el puerto ${ port }` );
}  )