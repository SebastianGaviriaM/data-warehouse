require('dotenv').config();

const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');


server.use(express.json());
server.use(express.static('public'));


server.listen(3000, ()=>{
    console.log("escuchando puerto " + process.env.PORT);
});

//rutas

server.use('/usuarios', require('./routes/usuario.routes'));
server.use('/', require('./routes/auth.routes'));

