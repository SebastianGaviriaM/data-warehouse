const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

router.route('/')
    .get(async(req, res)=>{      
        const result = await Usuario.obtenerTodos();
        res.json(result)
    })
    .post(async(req, res)=>{
        const {nombre, apellido, email, contrasena, admin} = req.body;
        const passwordhash = bcrypt.hashSync(contrasena, parseInt(process.env.bcrypttmes));
        const resultado = Usuario.crear(nombre, apellido, email, passwordhash, admin);
        res.json(resultado);
    })
    .put(async(req, res) =>{
        const id = req.query.id;
        const {nombre, apellido, email, contrasena, admin} = req.body;
        const result = await Usuario.actualizar(nombre, apellido, email, contrasena, admin, id);
        res.json(result);
    })
    .delete(async(req, res)=>{
        const id = req.query.id;
        await Usuario.borrar(id);
        res.json({
            status:200,
            respuesta: "Usuario eliminado"
        });
    });

router.route('/inicio')
    .get(async(req, res)=>{      
        const result = await Usuario.obtenerCantidad();
        res.json(result)
    })
    .post(async(req, res)=>{
        const {nombre, apellido, email, contrasena, admin} = req.body;
        const passwordhash = bcrypt.hashSync(contrasena, parseInt(process.env.bcrypttmes));
        const resultado = Usuario.crear(nombre, apellido, email, passwordhash, admin);
        res.json(resultado);
    })



module.exports = router; 