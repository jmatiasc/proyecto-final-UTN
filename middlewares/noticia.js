const {schemas} = require ("./schemas/crearNoticia");

const validateCreacionNoticia = (req, res, next) => {
    const {error, value} = schemas.crearNoticia.validate(req.body);
    if(error){
        const message = error.details[0].message;
        console.log("error");
        return message;
    }
    else {
        return null;
    }   
}


module.exports = { validateCreacionNoticia}