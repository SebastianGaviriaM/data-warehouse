const router = require('express').Router();
const Canal = require('../models/Canal');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Canal.obtenerTodos();
        res.json(result)
    })
    .post(async(req, res) =>{
        
        const {contacto, canal, preferencia, cuenta} = req.body;
        const result = await Canal.crearDetalles(contacto, canal, preferencia, cuenta);

        res.json({
            status:200,
            respuesta: "Contacto creado"
        });
    });



module.exports = router; 