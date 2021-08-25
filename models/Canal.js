const sequelize = require('../conexion');

let Canal = {};

Canal.obtenerTodos = async() =>{
    try {  
        const resultado = await sequelize.query('SELECT nombreCanal, id FROM canales', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Canal.crear = async(nombreCanal) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO canales (nombreCanal) VALUES (?)', {replacements:[nombreCanal]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Canal.actualizar = async(id, nombreCanal) =>{
    try {
        
        const resultado = await sequelize.query('UPDATE canales SET (nombreCanal=?) VALUES (?) WHERE id=?', {replacements:[nombreCanal, id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Canal.borrar = async(id) =>{
    try {
        
        const resultado = await sequelize.query('DELETE FROM canales WHERE id=?', {replacements:[id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Canal.crearDetalles = async(contacto, canal, preferencia, cuenta) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO canalescontactos (contacto_id, canal_id, preferencia, cuenta) VALUES (?, ?, ?, ?)', {replacements:[contacto, canal, preferencia, cuenta]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}




module.exports = Canal;