const router = require('express').Router();
const Region = require('../models/Region');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Region.obtenerTodos();
        res.json(result)
    })
    .post(async(req, res)=>{
        const {nombreRegion} = req.body;
        const result = await Region.crear(nombreRegion);
        res.json(result);
    })
    .delete(async(req, res)=>{
        const id = req.query.id
        const result = await Region.borrar(id);
        res.json(result);
    })

router.route('/busqContacto')
    .get(async(req, res)=>{         
        const result = await Region.obtenerBusqueda(req.query.busqueda);
        res.json(result)
    })

module.exports = router; 