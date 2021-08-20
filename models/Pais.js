const sequelize = require('../conexion');

let Pais = {};

Pais.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombrePais, region FROM paises', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Pais.crear = async(nombre, region) => {
    try {
        
        const resultado = await sequelize.query('INSERT INTO paises (nombrePais, region) VALUES (?, ?)', {replacements: [nombrePais, region]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Pais.actualizar = async(id, nombrePais, region) =>{
    try {

        const resultado = await sequelize.query('UPDATE paises SET nombrePais=?, region=? WHERE id=?', {replacements: [nombrePais, region, id]});
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

Pais.borrar = async(id) => {
    try {
        
        const resultado = await sequelize.query('DELETE FROM paises WHERE id=?', {replacements: [id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Pais.obtenerPorRegion = async(region) =>{
    try {
        
        const resultado = await sequelize.query('SELECT paises.nombrePais FROM paises INNER JOIN regiones ON paises.region = regiones.id WHERE regiones.nombreRegion = ?', {replacements:[region], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

module.exports = Pais;