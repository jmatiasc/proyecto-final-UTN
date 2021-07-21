const {crearNoticia,editarNoticia} = require('./../models/noticias');
const {imgFile} = require('./../utils/fileHandler');

const addNoticia = async(body, file, id) => {
    try {
        
        if( file ){const img = imgFile(file);
            const obj= {
                titular:body.titular,
                bajada:body.bajada,
                cuerpo:body.cuerpo,
                id_seccion:body.seccion,
                id_autor:id,
                vistas:0,
                habilitado:1,
                imagen:img,
                epigrafe:body.epigrafe}
            return await crearNoticia(obj);
        }
        else{
            const obj= {
                titular:body.titular,
                bajada:body.bajada,
                cuerpo:body.cuerpo,
                id_seccion:body.seccion,
                id_autor:id,
                vistas:0,
                habilitado:1}
            return await crearNoticia(obj);
        }
        
    } catch (error) {
        console.error(error);
    }
}

const editNoticia = async(body,file,id) => {
    
    try {
        if( file ){
            const img = imgFile(file);

           
            const obj= {
                titular:body.titular,
                bajada:body.bajada,
                cuerpo:body.cuerpo,
                id_seccion:body.seccion,
                imagen:img,
                epigrafe:body.epigrafe
            }

            return await editarNoticia(id,obj);
        }
        else{

            const obj= {
                titular:body.titular,
                bajada:body.bajada,
                cuerpo:body.cuerpo,
                id_seccion:body.seccion,
                epigrafe:body.epigrafe
            }

            return await editarNoticia(id,obj);
        }

        
    
    } catch (error) {
        console.error(error);
    }
}


module.exports = {addNoticia,editNoticia}