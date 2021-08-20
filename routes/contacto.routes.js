const router = require('express').Router();
const Contacto = require('../models/Contacto');


router.route('/')
    .get(async(req, res)=>{
        try {
            const resultado = await Contacto.pantallaContactos();
            res.json(resultado);
            
        } catch (error) {
            console.log("Hubo un error con la base de datos");
        }

    }
    )


module.exports = router;