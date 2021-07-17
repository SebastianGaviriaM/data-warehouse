const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.conexion_path);

sequelize.authenticate().then(()=>{
    console.log('conectado a la BD');
}).catch(err => {console.log(err);
});

module.exports = sequelize;
