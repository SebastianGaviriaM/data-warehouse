const router = require('express').Router();
const Pais = require('../models/Pais');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Pais.obtenerTodos();
        res.json(result)
    })


router.route('/nombreRegion')
    .get(async(req, res)=>{         
        const result = await Pais.obtenerPorRegion(req.query.region);
        res.json(result)
    })

router.route('/busqContacto')
    .get(async(req, res)=>{         
        const result = await Pais.obtenerBusqueda(req.query.busqueda);
        res.json(result)
    })



module.exports = router; 