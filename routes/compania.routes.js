const router = require('express').Router();
const Compania = require('../models/Compania');


router.route('/nombres')
    .get(async(req, res)=>{         
        const result = await Compania.traerNombres();
        res.json(result)
    })
router.route('/busqContacto')
    .get(async(req, res)=>{         
        const result = await Compania.obtenerBusqueda(req.query.busqueda);
        res.json(result)
    })


module.exports = router; 