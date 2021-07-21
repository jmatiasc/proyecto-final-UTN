const pool = require('./../utils/bd');
const T_NOTICIAS = "noticias";
const T_SECCIONES = "secciones";
const T_USUARIOS = "usuarios"

const getAllNoticias = async() => {
        //trae todas las noticas y sus respectivas secciones omitiendo el autor que las escribio.
        const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.habilitado = 1";
        const params = [T_NOTICIAS, T_SECCIONES];
        const ret = await pool.query(query, params);
        return ret;
    
    }

const getSigleNoticia = async(id) =>{
    //trae todas las noticias que tengan un id igual al id pasado por parametros
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo,n.id_seccion, n.id_autor,n.imagen, n.epigrafe, s.nombre AS nombreSeccion, u.nombre AS nombreAutor, u.apellido AS apellidoAutor FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id JOIN ?? AS u ON n.id_autor = u.id WHERE n.habilitado = 1 AND n.id = ?";
    const params = [T_NOTICIAS, T_SECCIONES,T_USUARIOS, id];
    const ret = await pool.query(query, params);
    return ret;
}



const getAllNoticiasForSeccion = async( seccion ) => {
    //trae todas las noticas con el id de seccion pasado por parametros
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.habilitado = 1 AND n.id_seccion = ?";
    const params = [T_NOTICIAS, T_SECCIONES, seccion];
    const ret = await pool.query(query, params);
    return ret;

}


const getTop5vistas= async() => {
    //trae las 5 noticias con más vistas desde que se creó la pagina

    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.habilitado = 1 ORDER BY n.vistas DESC LIMIT 3";
    
    //const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id ";
    
    const params = [T_NOTICIAS, T_SECCIONES];
    //const params = [T_NOTICIAS];
    const ret = await pool.query(query, params);
    return ret;
}

const getUltimasNoticias= async() => {
    //trae las ultimas 5 noticias creadas por el ts_updates, es decir que si se modificaron tambien las traeria
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.habilitado = 1 ORDER BY n.ts_update DESC LIMIT 3";
    const params = [T_NOTICIAS, T_SECCIONES];
    const ret = await pool.query(query, params);
    return ret;
}

const getUltimasNoticiasForSeccion= async( seccion ) => {
    //trae las ultimas noticas dependiendo de la seccion pasadas por parametro
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.habilitado = 1 AND s.id = ? ORDER BY n.ts_update DESC LIMIT 7";
    const params = [T_NOTICIAS, T_SECCIONES,seccion];
    const ret = await pool.query(query, params);
    return ret;
}

const getAllNoticiasUsuario= async( usuario ) => {
    //trae todas las noticas escritas por el usuario pasado por parametro, lo que recibimos por parametro es el id del usuario
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.id_autor = ? ";
    const params = [T_NOTICIAS, T_SECCIONES,usuario];
    const ret = await pool.query(query, params);
    return ret;
}

const buscarPorTitular= async( titular ) => {
    //le coloco los "%" de cada lado para que busque cualquier cadena de caracteres que contengan a titular 
    const titularAux = '%' + titular + '%';
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.titular LIKE ? AND n.habilitado = 1";
    const params = [T_NOTICIAS, T_SECCIONES,titularAux];
    const ret = await pool.query(query, params);
    return ret;
}

const buscarPorBajada= async( bajada ) => {
    //le coloco los "%" de cada lado para que busque cualquier cadena de caracteres que contengan a bajada 
    const bajadaAux = '%' + bajada + '%';
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.bajada LIKE ? AND n.habilitado = 1";
    const params = [T_NOTICIAS, T_SECCIONES,bajadaAux];
    const ret = await pool.query(query, params);
    return ret;
}



const buscarPorCuerpo= async( cuerpo ) => {
    //le coloco los "%" de cada lado para que busque cualquier cadena de caracteres que contengan el cuerpo de la noticia
    const cuerpoAux = '%' + cuerpo + '%';
    const query = "SELECT n.id, n.titular, n.bajada, n.vistas, n.ts_create , n.ts_update, n.cuerpo, n.imagen, n.epigrafe, s.nombre AS nombreSeccion FROM ?? AS n JOIN ?? AS s ON n.id_seccion = s.id WHERE n.cuerpo LIKE ? AND n.habilitado = 1";
    const params = [T_NOTICIAS, T_SECCIONES,cuerpoAux];
    const ret = await pool.query(query, params);
    return ret;
}

const crearNoticia = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_NOTICIAS, obj];
    return await pool.query(query, params);
}


const editarNoticia = async(id, obj) => {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [T_NOTICIAS, obj, id];
        return await pool.query(query, params);
}


const habilitarDeshabilitarNoticia = async(id, valor) => {
        const query = "UPDATE ?? SET habilitado = ? WHERE id = ?";
        const params = [T_NOTICIAS,valor, id];
        return await pool.query(query, params);
}

module.exports ={
    getAllNoticias,
    getSigleNoticia,
    getAllNoticiasForSeccion,
    getTop5vistas,
    getUltimasNoticias,
    getUltimasNoticiasForSeccion,
    getAllNoticiasUsuario,
    buscarPorTitular,
    buscarPorBajada,
    buscarPorCuerpo,
    crearNoticia,
    editarNoticia,
    habilitarDeshabilitarNoticia
}