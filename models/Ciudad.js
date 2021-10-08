const sequelize = require('../conexion');

let Ciudad = {};

Ciudad.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombreCiudad, pais FROM ciudades', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Ciudad.obtenerBusqueda = async(palabra) =>{
    try {
        const resultado = await sequelize.query('SELECT nombreCiudad FROM ciudades WHERE nombreCiudad LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}





Ciudad.crear = async(nombreCiudad, pais) => {
    try {
        
        const resultado = await sequelize.query('INSERT INTO ciudades (nombreCiudad, pais) VALUES (?, ?)', {replacements: [nombreCiudad, pais]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Ciudad.actualizar = async(id, nombreCiudad, pais) =>{
    try {

        const resultado = await sequelize.query('UPDATE ciudades SET nombreCiudad=?, pais=? WHERE id=?', {replacements: [nombreCiudad, pais, id]});
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

Ciudad.obtenerPorPais = async(pais) =>{
    try {
        
        const resultado = await sequelize.query('SELECT ciudades.nombreCiudad, ciudades.id FROM ciudades INNER JOIN paises ON ciudades.pais = paises.id WHERE paises.id = ?', {replacements:[parseInt(pais)], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}


module.exports = Ciudad;