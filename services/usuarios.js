const {crearUsuario,editarUsuario} = require('./../models/usuarios');
const {imgFile} = require('./../utils/fileHandler');
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const { send } = require('./mail')

const addUsuario = async(body, file) => {
    try {
        
        if( file ){
            const img = imgFile(file);
            const pass = sha1(body.pass);
            const uid = uuid();

            const obj = {
                nombre:body.nombre,
                apellido:body.apellido,
                admin:body.admin,
                email:body.email,
                img:img ,
                confirmacionCorreo:uid,
                habilitado:0,  
                pass:pass };
                
                send({
                    mail : obj.email, 
                    cuerpo:
                    `<h1> Te damos la bienvenida a #HashtagNews ${obj.nombre} ${obj.apellido} !!!</h1>
                    <a href="http://${process.env.URL_SERVER}:${process.env.PORT}/usuario/verify/${obj.confirmacionCorreo}"> Click aquí para dar de alta tu cuenta y comenzar a escribir para nosotros</a>`,
                    });

            return await crearUsuario(obj);
        }else
            {
                const pass = sha1(body.pass);
                const uuid = uuid();
    
                const obj = {
                    nombre:body.nombre,
                    apellido:body.apellido,
                    admin:body.admin,
                    confirmacionCorreo:uuid,
                    habilitado:0,  
                    pass:pass };

                    send({
                        mail : obj.email, 
                        cuerpo:
                        `<h1> Te damos la bienvenida a #HashtagNews ${obj.nombre} ${obj.apellido} !!!</h1>
                        <a href="http://${process.env.URL_SERVER}:${process.env.PORT}/usuario/verify/${obj.confirmacionCorreo}"> Click aquí para dar de alta tu cuenta y comenzar a escribir para nosotros</a>`,
                        });
    

                return await crearUsuario(obj);      
             }
    
    } catch (error) {}
        console.error(error);
    
}

const editUsuario = async(body,file,id) => {
    
    try {
        if( file ){
            const img = imgFile(file);

            const obj = {
                nombre: body.nombre,
                apellido: body.apellido,
                email:body.email,
                img: img,
                pass:body.pass
            };

            return await editarUsuario(id,obj);
        }
        else{

            const obj = {
                nombre: body.nombre,
                apellido: body.apellido,
                email:body.email,
                pass:body.pass
            };

            return await editarUsuario(id,obj);
        }

        
    
    } catch (error) {
        console.error(error);
    }
}


module.exports = {addUsuario,editUsuario}

