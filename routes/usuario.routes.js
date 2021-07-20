const router = require('express').Router();
const Usuario = require('../models/Usuario');

router.route('/')
    .get(async(req, res)=>{         //Middleware solo admin
        const result = await Usuario.obtenerTodos();
        res.json(result)
    })
    .put(async(req, res) =>{
        const id = req.query.id;
        const {nombreUsuario, nombreYApellido, email, telefono, direccion} = req.body;
        const result = await Usuario.actualizar(id, nombreUsuario, nombreYApellido, email, telefono, direccion);
        res.json({
            status:200,
            respuesta: "Usuario actualizado"
        });
    })
    .delete(async(req, res)=>{
        const id = req.query.id;
        await Usuario.borrar(id);
        res.json({
            status:200,
            respuesta: "Usuario eliminado"
        });
    });



module.exports = router; 