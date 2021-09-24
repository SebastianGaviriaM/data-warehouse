const router = require('express').Router();
const Region = require('../models/Region');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Region.obtenerTodos();
        res.json(result)
    })

router.route('/busqContacto')
    .get(async(req, res)=>{         
        const result = await Region.obtenerBusqueda(req.query.busqueda);
        res.json(result)
    })

module.exports = router; 