const pool = require('./../utils/bd');
const T_COMENTARIOS = "comentarios";


const getAllComentarios = async(id) => {
    //me trae todos los comentarios cuyo id_noticias sea igual al id pasado por parametro
    const query = "SELECT * FROM ?? AS c WHERE c.id_noticia = ?";
    const params = [T_COMENTARIOS, id];
    const ret = await pool.query(query, params);
    return ret;

}

const crearComentario = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_COMENTARIOS, obj];
    return await pool.query(query, params);
}


const deshabilitarComentario = async(id) => {
    //deshabilitara el comentario con id igual al id pasado por parametro
    const query = "UPDATE ?? SET habilitado = 1 WHERE id = ?";
    const params = [T_COMENTARIOS, id];
    return await pool.query(query, params);
}

module.exports ={getAllComentarios,crearComentario,deshabilitarComentario}