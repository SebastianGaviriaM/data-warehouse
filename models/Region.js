const sequelize = require('../conexion');

let Region = {};




Region.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombreRegion FROM regiones', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Region.obtenerBusqueda = async(palabra) =>{
    try {
        const resultado = await sequelize.query('SELECT nombreRegion FROM regiones WHERE nombreRegion LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}








Region.crear = async(nombreRegion) => {
    try {
        
        const resultado = await sequelize.query('INSERT INTO regiones (nombreRegion) VALUES (?)', {replacements: [nombreRegion]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Region.actualizar = async(id, nombreRegion) =>{
    try {
        const resultado = await sequelize.query('UPDATE regiones SET nombreRegion=? WHERE id=?', {replacements: [nombreRegion, id]});
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


