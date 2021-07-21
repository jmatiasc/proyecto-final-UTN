const pool = require('./../utils/bd');
const T_IMAGENES = "imagenes";


const getImagenesNoticia = async(id) =>{
    const query = "SELECT i.nombre, i.epigrafe FROM ?? AS i WHERE i.id_noticia = ? AND habilitado = 1";
    const params = [T_IMAGENES, id];
    const ret = await pool.query(query, params);
    return ret;
}

const crearImagen = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_IMAGENES, obj];
    return await pool.query(query, params);
}


const habilitarDeshabilitarImagen = async(id, valor) => {
    const query = "UPDATE ?? SET habilitado = ? WHERE id = ?";
    const params = [T_IMAGENES,valor, id];
    return await pool.query(query, params);
}

module.exports ={crearImagen,habilitarDeshabilitarImagen,getImagenesNoticia}
