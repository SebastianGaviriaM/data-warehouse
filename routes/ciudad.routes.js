const router = require('express').Router();
const Ciudad = require('../models/Ciudad');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Ciudad.obtenerTodos();
        res.json(result)
    })
    .post(async(req, res)=>{
        const {nombreCiudad, pais} = req.body;
        const result = await Ciudad.crear(nombreCiudad, pais);
        res.json(result);
    })
    .put(async(req, res) =>{
        const id = req.query.id;
        const {nombreCiudad} = req.body;
        const result = await Ciudad.actualizar(nombreCiudad, id);
        res.json(result);
    })
    .delete(async(req, res)=>{
        const id = req.query.id
        const result = await Ciudad.borrar(id);
        res.json(result);
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