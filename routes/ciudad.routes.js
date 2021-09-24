const router = require('express').Router();
const Ciudad = require('../models/Ciudad');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Ciudad.obtenerTodos();
        res.json(result)
    })


router.route('/nombrePais')
    .get(async(req, res)=>{         
        const result = await Ciudad.obtenerPorPais(req.query.pais);
        res.json(result)
    })

    
router.route('/busqContacto')
    .get(async(req, res)=>{         
        const result = await Ciudad.obtenerBusqueda(req.query.busqueda);
        res.json(result)
    })


module.exports = router; 