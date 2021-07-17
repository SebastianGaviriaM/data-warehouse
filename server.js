require('dotenv').config();

const express = require('express');
const server = express();
server.use(express.json());


const expressJwt = require('express-jwt');

// server.use(expressJwt({
//     secret:process.env.jwtPass, 
//     algorithms: ['HS256']
// }).unless({
//     path: ['/api/login', '/api/registro']
// }));

server.listen(3000, ()=>{
    console.log("escuchando puerto " + process.env.PORT);
});



//rutas

// app.use('/api/login', require('./routes/auth.routes'));