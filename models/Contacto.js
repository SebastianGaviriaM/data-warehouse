const sequelize = require('../conexion');

let Contacto = {};

Contacto.obtenerTodos = async() =>{
    try {
        
        const resultado = await sequelize.query('SELECT id, nombre, apellido,  email, telefono, compania, cargo, canal_preferido FROM contactos', {type: sequelize.QueryTypes.SELECT});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.crear = async(nombre, apellido, email, telefono, compania, cargo, canal_preferido) =>{
    try {
        
        const resultado = await sequelize.query('INSERT INTO contactos (nombre, apellido, email, telefono, compania, cargo, canal_preferido) VALUES (?, ?, ? ,? ,?)', {replacements:[nombre, apellido, email, telefono, compania, cargo, canal_preferido]});
        return resultado;

    } catch (error) {
        console.log(error);
    }
}

Contacto.actualizar = async(id, nombre, apellido, email, telefono, compania, cargo, canal_preferido) =>{
    try {
        
        const resultado = await sequelize.query('UPDATE Contactos SET (nombre=?, apellido=?, email=?, telefono=?, compania=?, cargo=?, canal_preferido=?) VALUES (?, ?, ? ,? ,?, ?, ?) WHERE id=?', {replacements:[nombre, apellido, email, telefono, compania, cargo, canal_preferido, id]});
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

module.exports = Contacto;