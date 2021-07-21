const pool = require('./../utils/bd');
const T_SECCIONES = "secciones";


const getAllSecciones = async() => {
    //obtengo todas las secciones creadas
    const query = "SELECT * FROM ?? ";
    const params = [T_SECCIONES];
    const ret = await pool.query(query, params);
    return ret;

}

const crearSeccion = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_SECCIONES, obj];
    return await pool.query(query, params);
}


const habilitarDeshabilitarSeccion = async(id, valor) => {
    const query = "UPDATE ?? SET habilitado = ? WHERE id = ?";
    const params = [T_SECCIONES,valor, id];
    return await pool.query(query, params);
}

module.exports ={getAllSecciones,crearSeccion,habilitarDeshabilitarSeccion}