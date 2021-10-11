require('dotenv').config();

const express = require('express');
const server = express();


server.use(express.json());
server.use(express.static('public'));


server.listen(3000, ()=>{
    console.log("escuchando puerto " + process.env.PORT);
});

//rutas

server.use('/usuarios', require('./routes/usuario.routes'));
server.use('/', require('./routes/auth.routes'));
server.use('/contactos', require('./routes/contacto.routes'));
server.use('/companias', require('./routes/compania.routes'));
server.use('/regiones', require('./routes/regiones.routes'));
server.use('/paises', require('./routes/pais.routes'));
server.use('/ciudades', require('./routes/ciudad.routes'));
server.use('/canales', require('./routes/canal.routes'));


