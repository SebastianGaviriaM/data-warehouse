const sequelize = require('../conexion');

let Pais = {};

Pais.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombre, region FROM paises', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Pais.crear = async(nombre, region) => {
    try {
        
        const resultado = await sequelize.query('INSERT INTO paises (nombre, region) VALUES (?, ?)', {replacements: [nombre, region]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Pais.actualizar = async(id, nombre, region) =>{
    try {

        const resultado = await sequelize.query('UPDATE paises SET nombre=?, region=? WHERE id=?', {replacements: [nombre, region, id]});
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

module.exports = Pais;