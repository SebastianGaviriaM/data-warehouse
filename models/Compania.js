const sequelize = require('../conexion');

let Compania = {};

Compania.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombre, telefono, email, direccion, ciudad FROM companias', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Compania.crear = async(nombre, telefono, email, direccion, ciudad) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO companias (nombre, telefono, email, direccion, ciudad) VALUES (?, ?, ? ,? ,?)', {replacements:[nombre, telefono, email, direccion, ciudad]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Compania.actualizar = async(id, nombre, telefono, email, direccion, ciudad) =>{
    try {
        
        const resultado = await sequelize.query('UPDATE companias SET (nombre=?, telefono=?, email=?, direccion=?, ciudad=?) VALUES (?, ?, ? ,? ,?) WHERE id=?', {replacements:[nombre, telefono, email, direccion, ciudad, id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Compania.borrar = async(id) =>{
    try {
        
        const resultado = await sequelize.query('DELETE FROM companias WHERE id=?', {replacements:[id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

module.exports = Compania;