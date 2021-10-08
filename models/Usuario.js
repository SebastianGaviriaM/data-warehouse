const sequelize = require('../conexion');

let Usuario = {};

Usuario.obtenerTodos = async() =>{
    try {
        const resultado = await sequelize.query('SELECT id, nombre, apellido, email, admin FROM usuarios', {type: sequelize.QueryTypes.SELECT});
        return resultado;
        
        
    } catch (error) {
        console.log(error);
    }
    
};

Usuario.crear = async(nombre, apellido, email, passwordhash, admin) => {
    try {
        const result = await sequelize.query('INSERT INTO usuarios (nombre, apellido, email, contrasena, admin) VALUES (?, ?, ?, ?, ?);', {
            replacements: [nombre, apellido, email, passwordhash, admin]
        });
        return result;
        
    } catch (error) {
        console.log(error);
        
    }  
};
Usuario.actualizar = async (id, nombre, apellido, email) =>{
    try {
        const resultado = await sequelize.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ? WHERE id = ?', {replacements:[nombre, apellido, email,id]});
        return resultado;
        
    } catch (error) {
        console.log(error);
    }
};
Usuario.borrar =  async (id) => {
    try {
        await sequelize.query('DELETE FROM usuarios WHERE id = ?',
        {
            replacements:[id]
        });
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = Usuario;