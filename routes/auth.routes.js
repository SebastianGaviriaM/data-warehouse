const router = require('express').Router();
const sequelize = require('../conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuarios')

router.route('/login')
    .post(async(req, res) =>{
        const {nombreUsuario, contrasena} = req.body;
        const result = await sequelize.query('SELECT * FROM usuario WHERE nombreUsuario = ? OR email = ? ;', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [nombreUsuario, nombreUsuario] 
        });
        
        if(result.length > 0 && bcrypt.compareSync(contrasena, result[0].contrasena)){
            console.log(result);
            const token = jwt.sign({usuario:{id:result[0].id, nombre: result[0].nombreUsuario, email: result[0].email, admin: result[0].esAdmin} }, process.env.jwtPass);    
            res.json(token);
        }else{
            res.status(401).json('Usuario y/o contraseña están incorrectas')
        }
    });

router.route('/registro')    
    .post(mdlwrUsuario.crear, mdlwrUsuario.nombres, mdlwrUsuario.email, async(req, res)=>{
        const {nickname, nombre, email, telefono, direccion, contrasena} = req.body;
        const passwordhash = bcrypt.hashSync(contrasena, parseInt(process.env.bcrypttmes));
        Usuario.crear(nickname, nombre, email, telefono, direccion, passwordhash);

        res.status(204).end();
    });

module.exports = router;