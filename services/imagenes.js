const {crearImagen} = require('./../models/imagenes');
const {imgFile} = require('./../utils/fileHandler');

const addImagen = async(body, file,id) => {
    try {
        const {epigrafe : epigrafe} = body; 
        const nombre = imgFile(file);
        const obj = {
            id_noticia:id,
            nombre:nombre,
            epigrafe:epigrafe,
            habilitado: 1 };
        return await crearImagen(obj);
    } catch (error) {
        console.error(error);
    }
}


module.exports = {addImagen}