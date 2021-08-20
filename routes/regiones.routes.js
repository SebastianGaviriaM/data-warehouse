const router = require('express').Router();
const Region = require('../models/Region');


router.route('/')
    .get(async(req, res)=>{         
        const result = await Region.obtenerTodos();
        res.json(result)
    })



module.exports = router; 