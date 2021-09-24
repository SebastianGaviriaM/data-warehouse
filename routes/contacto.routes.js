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
        
        const {nombreContacto, apellido, email, compania, cargo, interes, ciudad} = req.body;
        const result = await Contacto.crear(nombreContacto, apellido, email, compania, cargo, interes, ciudad);
        res.json(result);
    })
    .delete(async(req, res)=>{
        const id = req.query.id;
        await Contacto.borrar(id);
        res.json({
            status:200,
            respuesta: "Usuario eliminado"
        });
    });

router.route('/busqContacto/nombre')
    .get(async(req, res)=>{         
        const result = await Contacto.obtenerNombreBusqueda(req.query.busqueda);
        res.json(result)
    })

router.route('/busqContacto/apellido')
    .get(async(req, res)=>{         
        const result = await Contacto.obtenerApellidoBusqueda(req.query.busqueda);
        res.json(result)
    })
router.route('/busqContacto/email')
    .get(async(req, res)=>{         
        const result = await Contacto.obtenerEmailBusqueda(req.query.busqueda);
        res.json(result)
    })
router.route('/busqContacto/cargo')
    .get(async(req, res)=>{         
        const result = await Contacto.obtenerCargoBusqueda(req.query.busqueda);
        res.json(result)
    })

router.route('/busqContacto')
    .get(async(req, res)=>{         
        const result = await Contacto.pantallaContactosPorBusqueda(req.query.busqueda);
        res.json(result)
    })


module.exports = router;