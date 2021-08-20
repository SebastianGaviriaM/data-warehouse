const router = require('express').Router();
const Canal = require('../models/Canal');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Canal.obtenerTodos();
        res.json(result)
    });



module.exports = router; 