const {schemas} = require ("./schemas/crearUsuario");

const validateCreacionUsuario = (req, res, next) => {
    const {error, value} = schemas.crearUsuario.validate(req.body);
    if(error){
        const message = error.details[0].message;
        console.log("error");
        return message;
    }
    else {
        return null;
    }   
}


module.exports = { validateCreacionUsuario}