const router = require('express').Router();
const Contacto = require('../models/Contacto');
const Canal = require('../models/Canal');


router.route('/')
    .get(async(req, res)=>{
        try {
            const resultado = await Contacto.pantallaContactos();
            res.json(resultado);
            
        } catch (error) {
            console.log("Hubo un error con la base de datos");
        }
    })
    .post(async(req, res) =>{
        
        const {nombreContacto, apellido, email, telefono, compania, cargo, interes, ciudad, canales, preferenciasCanales, cuentaCanal} = req.body;
        const result = await Contacto.crear(nombreContacto, apellido, email, telefono, compania, cargo, interes, ciudad);

        console.log(result[0]);
        for (let index = 0; index < canales.length; index++) {
            Canal.crearDetalles(result[0], canales[index], preferenciasCanales[index], cuentaCanal[index]);
        }

        res.json({
            status:200,
            respuesta: "Pedido creado"
        });
    })


module.exports = router;