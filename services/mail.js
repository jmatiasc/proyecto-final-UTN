
const nodemailer = require('nodemailer');

// como el envia de emails tiene demora debo usar async - await para que solo se ejecute la consulta 
// de emails cuando se haya enviado el email 

const send = async ({mail,cuerpo}) =>{   //esta funcion se encargará de enviar el email
    const transporter =  nodemailer.createTransport({


        //primero ponemos quien enviará el email

        host:'smtp.outlook.com', //------>acá pondremos cual será el proveedor que estamos usando    //
        port: 587,     //------->numero del puerto que estamos usando                                //------------------------->>>todo esto se puede resumir en  "service:'outlook';"-->
        secure:false,  //-------> acá ponemos si la pagina tiene certificado de seguridad o no       //                             con variables de entorno ----> porcess.env.MAIL_SERVICE
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    //ahora ponemos A QUIEN  se enviara el email
    const info = {
           //----->quien lo manda
        to: mail,          //------> a quien se lo mando
        subject: " hashtagNews ",                      //------>datos que van en el email
        html: cuerpo,                       //------>datos que van en el email
        
    };

    //ahora enviamos el email

    const {messageId} = await transporter.sendMail(info);
    return messageId;

}

module.exports = {send};