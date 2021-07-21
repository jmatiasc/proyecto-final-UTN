const pool = require('./../utils/bd');
const T_USUARIOS = "usuarios";


const getAllUsuarios = async() => {
    //Me trae todos los usiarios de la base de datos, esten habilitados o no (esta funcion solo la puede usar el administrador).
    const query = "SELECT u.id, u.nombre, u.apellido, u.admin, u.img, u.habilitado, u.pass FROM ?? AS u";
    const params = [T_USUARIOS];
    const ret = await pool.query(query, params);
    return ret;
}

const getSingleUsuario = async(id) =>{
    const query = "SELECT u.id, u.nombre, u.apellido, u.admin, u.img, u.habilitado, u.pass FROM ?? AS u WHERE u.id = ?";
    const params = [T_USUARIOS, id];
    const ret = await pool.query(query, params);
    return ret;
}

const crearUsuario = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_USUARIOS, obj];
    return await pool.query(query, params);
}

const editarUsuario = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [T_USUARIOS, obj, id];
    return await pool.query(query, params);
}

const habilitarDeshabilitarUsuario = async(id, valor) => {
    const query = "UPDATE ?? SET habilitado = ? WHERE id = ?";
    const params = [T_USUARIOS,valor, id];
    return await pool.query(query, params);
}

const permisoDeAdministrador = async(id, valor) => {
     //Concede permiso de administrador al usuario el id pasado por parametro, esten habilitados o no (esta funcion solo la puede usar el administrador).
    const query = "UPDATE ?? SET admin = ? WHERE id = ?";
    const params = [T_USUARIOS,valor, id];
    return await pool.query(query, params);
}

const loguear = async(email , pass) => {
    const query = "SELECT * FROM ?? WHERE email = ? AND pass = ? AND habilitado = 1 ";
    const params = [T_USUARIOS, email, pass];
    return await pool.query(query, params);
}

const altaUser = async(uid) => {
    const query = "UPDATE ?? SET habilitado = 1 WHERE confirmacionCorreo = ?"
    const params = [T_USUARIOS, uid];
    return await pool.query(query, params);
} 


module.exports ={editarUsuario,getAllUsuarios,getSingleUsuario,crearUsuario,habilitarDeshabilitarUsuario,permisoDeAdministrador,loguear,altaUser}