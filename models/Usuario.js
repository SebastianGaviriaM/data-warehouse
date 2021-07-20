const sequelize = require('../conexion');

let Usuario = {};

Usuario.obtenerTodos = async() =>{
    try {
        const resultado = await sequelize.query('SELECT id, nombre, apellido, email, prefil FROM usuario', {type: sequelize.QueryTypes.SELECT});
        return resultado;
        
    } catch (error) {
        console.log(error);
    }
    
};

Usuario.crear = async(nombre, apellido, email, perfil, passwordhash) => {
    try {
        const result = await sequelize.query('INSERT INTO usuarios (nombre, apellido, email, perfil, contrasena, admin) VALUES (?, ?, ?, ?, ?, true);', {
            replacements: [nombre, apellido, email, perfil, passwordhash]
        });
        return result;
        
    } catch (error) {
        console.log(error);
        
    }  
};
Usuario.actualizar = async (id, nombre, apellido, email, perfil) =>{
    try {
        const resultado = await sequelize.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, perfil = ? WHERE id = ?', {replacements:[nombre, apellido, email, perfil, id]});
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