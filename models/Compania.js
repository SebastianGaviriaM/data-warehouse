const sequelize = require('../conexion');

let Compania = {};

Compania.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombreCompania, telefono, email, direccion, ciudad FROM companias', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Compania.obtenerBusqueda = async(palabra) =>{
    try {
        const resultado = await sequelize.query('SELECT nombreCompania FROM companias WHERE nombreCompania LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}


Compania.crear = async(nombreCompania, telefono, email, direccion, ciudad) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO companias (nombreCompania, telefono, email, direccion, ciudad) VALUES (?, ?, ? ,? ,?)', {replacements:[nombreCompania, telefono, email, direccion, ciudad]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Compania.actualizar = async(id, nombreCompania, telefono, email, direccion, ciudad) =>{
    try {
        
        const resultado = await sequelize.query('UPDATE companias SET (nombreCompania=?, telefono=?, email=?, direccion=?, ciudad=?) VALUES (?, ?, ? ,? ,?) WHERE id=?', {replacements:[nombreCompania, telefono, email, direccion, ciudad, id]});
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

Compania.traerNombres = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT nombreCompania, id FROM companias', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Compania.paginaCompanias = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT companias.*, nombreCiudad FROM companias INNER JOIN ciudades ON companias.ciudad = ciudades.id;', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}


module.exports = Compania;