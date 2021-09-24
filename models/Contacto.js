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

Contacto.obtenerNombreBusqueda = async(palabra) =>{
    try {
        
        const resultado = await sequelize.query('SELECT nombreContacto FROM contactos WHERE nombreContacto LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.obtenerApellidoBusqueda = async(palabra) =>{
    try {
        
        const resultado = await sequelize.query('SELECT apellido FROM contactos WHERE apellido LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.obtenerEmailBusqueda = async(palabra) =>{
    try {
        
        const resultado = await sequelize.query('SELECT email FROM contactos WHERE email LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.obtenerCargoBusqueda = async(palabra) =>{
    try {
        
        const resultado = await sequelize.query('SELECT cargo FROM contactos WHERE cargo LIKE ?;', {replacements: [`${palabra}%`], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}


Contacto.crear = async(nombreContacto, apellido, email, compania, cargo, interes, ciudad) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO contactos (nombreContacto, apellido, email, compania, cargo, interes, ciudad) VALUES (?, ?, ? ,?, ?, ?, ?)', {replacements:[nombreContacto, apellido, email, compania, cargo, interes, ciudad]});
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
        const resultado = await sequelize.query("SELECT contactos.*, companias.nombreCompania, paises.nombrePais, regiones.nombreRegion, canales.nombreCanal, ciudades.nombreCiudad FROM contactos INNER JOIN companias ON contactos.compania = companias.id INNER JOIN ciudades ON contactos.ciudad = ciudades.id INNER JOIN paises ON ciudades.pais = paises.id INNER JOIN regiones ON paises.region = regiones.id INNER JOIN canalescontactos ON canalescontactos.contacto_id = contactos.id INNER JOIN canales ON canales.id = canalescontactos.canal_id WHERE canalescontactos.preferencia = 'Canal favorito';", {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.pantallaContactosPorBusqueda = async(palabra) =>{
    try {
        const resultado = await sequelize.query("SELECT contactos.*, companias.nombreCompania, paises.nombrePais, regiones.nombreRegion, canales.nombreCanal, contactos.* FROM contactos INNER JOIN companias ON contactos.compania = companias.id INNER JOIN ciudades ON contactos.ciudad = ciudades.id INNER JOIN paises ON ciudades.pais = paises.id INNER JOIN regiones ON paises.region = regiones.id INNER JOIN canalescontactos ON canalescontactos.contacto_id = contactos.id INNER JOIN canales ON canales.id = canalescontactos.canal_id WHERE canalescontactos.preferencia = 'Canal favorito' AND regiones.nombreRegion = ? OR paises.nombrePais = ? OR ciudades.nombreCiudad = ? OR companias.nombreCompania = ? OR contactos.nombreContacto = ? OR contactos.apellido = ? OR contactos.email = ? OR contactos.cargo = ?;", {replacements:[palabra, palabra, palabra, palabra, palabra, palabra, palabra, palabra], type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}







module.exports = Contacto;