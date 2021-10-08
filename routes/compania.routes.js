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
        res.json(result);
    })
router.route('/')
    .get(async(req, res)=>{
        const result = await Compania.paginaCompanias();
        res.json(result);
    })
    .post(async(req, res)=>{
        const {nombreCompania, telefono, email, direccion, ciudad} = req.body;
        const result = await Compania.crear(nombreCompania, telefono, email, direccion, ciudad);
        res.json(result);
    }) 


module.exports = router; 