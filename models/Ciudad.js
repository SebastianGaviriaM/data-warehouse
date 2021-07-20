const sequelize = require('../conexion');

let Ciudad = {};

Ciudad.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombre, pais FROM ciudades', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Ciudad.crear = async(nombre, pais) => {
    try {
        
        const resultado = await sequelize.query('INSERT INTO ciudades (nombre, pais) VALUES (?, ?)', {replacements: [nombre, pais]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Ciudad.actualizar = async(id, nombre, pais) =>{
    try {

        const resultado = await sequelize.query('UPDATE ciudades SET nombre=?, pais=? WHERE id=?', {replacements: [nombre, pais, id]});
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

Ciudad.borrar = async(id) => {
    try {
        
        const resultado = await sequelize.query('DELETE FROM ciudades WHERE id=?', {replacements: [id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

module.exports = Ciudad;