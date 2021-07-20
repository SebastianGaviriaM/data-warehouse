const router = require('express').Router();
const sequelize = require('../conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario')

router.route('/login')
    .post(async(req, res) =>{
        console.log(req.body);
        const {email, contrasena} = req.body;
        const result = await sequelize.query('SELECT * FROM usuarios WHERE email = ?;', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [email] 
        });
        console.log(result);
        if(result.length > 0 && bcrypt.compareSync(contrasena, result[0].contrasena)){
            const token = jwt.sign({usuario:{id:result[0].id, nombre: result[0].nombre, email: result[0].email, admin: result[0].admin} }, process.env.jwtPass, { expiresIn: '1h' });
            res.json(token);
        }else{
            res.status(401).json("Usuario y/o contrasena invalidos");
        }
    });

router.route('/registro')    
    .post(async(req, res)=>{
        const {nombre, apellido, email, perfil, contrasena} = req.body;
        const passwordhash = bcrypt.hashSync(contrasena, parseInt(process.env.bcrypttmes));
        Usuario.crear(nombre, apellido, email, perfil, passwordhash);

        res.status(204).end();
    });


router.route('/token')
    .get((req, res)=>{
        let token = req.headers.authorization.split(' ')[1];

        let payload = jwt.verify(token, process.env.jwtPass)
        console.log(payload);
        res.send(payload.usuario);
    });


module.exports = router;