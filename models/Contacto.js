const sequelize = require('../conexion');

let Contacto = {};

Contacto.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombreContacto, apellido,  email, telefono, compania, cargo, canal_preferido, interes FROM contactos', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.crear = async(nombreContacto, apellido, email, telefono, compania, cargo, canal_preferido, interes) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO contactos (nombreContacto, apellido, email, telefono, compania, cargo, canal_preferido, interes) VALUES (?, ?, ? ,? ,?)', {replacements:[nombreContacto, apellido, email, telefono, compania, cargo, canal_preferido, interes]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.actualizar = async(id, nombreContacto, apellido, email, telefono, compania, cargo, canal_preferido, interes) =>{
    try {
        
        const resultado = await sequelize.query('UPDATE Contactos SET (nombreContacto=?, apellido=?, email=?, telefono=?, compania=?, cargo=?, canal_preferido=?, interes=?) VALUES (?, ?, ? ,? ,?, ?, ?, ?) WHERE id=?', {replacements:[nombreContacto, apellido, email, telefono, compania, cargo, canal_preferido, interes, id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.borrar = async(id) =>{
    try {
        
        const resultado = await sequelize.query('DELETE FROM contactos WHERE id=?', {replacements:[id]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.pantallaContactos = async() =>{
    try {
        const resultado = await sequelize.query("SELECT contactos.*, companias.nombreCompania, paises.nombrePais, regiones.nombreRegion, canales.nombreCanal FROM contactos INNER JOIN companias ON contactos.compania = companias.id INNER JOIN ciudades ON companias.ciudad = ciudades.id INNER JOIN paises ON ciudades.pais = paises.id INNER JOIN regiones ON paises.region = regiones.id INNER JOIN canalescontactos ON canalescontactos.contacto_id = contactos.id INNER JOIN canales ON canales.id = canalescontactos.canal_id WHERE canalescontactos.preferencia = 'Canal favorito';", {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}


module.exports = Contacto;