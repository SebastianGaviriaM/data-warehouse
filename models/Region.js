const sequelize = require('../conexion');

let Region = {};

Region.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombre FROM regiones', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Region.crear = async(nombre) => {
    try {
        
        const resultado = await sequelize.query('INSERT INTO regiones (nombre) VALUES (?)', {replacements: [nombre]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Region.actualizar = async(id, nombre) =>{
    try {

        const resultado = await sequelize.query('UPDATE regiones SET nombre=? WHERE id=?', {replacements: [nombre, id]});
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

Region.borrar = async(id) => {
    try {
        
        const resultado = await sequelize.query('DELETE FROM regiones WHERE id=?', {replacements: [id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

module.exports = Region;


