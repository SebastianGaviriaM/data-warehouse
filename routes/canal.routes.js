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

router.route('/detalles')
    .get(async(req, res)=>{         
        const result = await Canal.obtenerDetallesPorContacto(req.query.contactoID);
        res.json(result);
    })
    .delete(async(req, res)=>{
        const result = await Canal.borrarDetalle(req.query.idSelect);
        res.json(result);
    })


module.exports = router; 