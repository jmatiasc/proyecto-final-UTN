const Joi = require('@hapi/joi'); 

const schemas = {
    crearNoticia: Joi.object().keys({
        epigrafe: Joi.string().max(300).messages({
            "string.max" : "La epigrafe puede tener como maximo 300 caracteres"
        }),
        titular: Joi.string().max(200).required().messages({
            "string.empty" : "La titular de la noticia es obligatoria",
            "string.max" : "La titular puede tener como maximo 200 caracteres"
        }),
        bajada: Joi.string().max(1000).required().messages({
            "string.empty" : "La bajada es obligatoria",
            "string.max" : "La bajada puede tener como maximo 1000 caracteres"
        }),
        cuerpo: Joi.string().required().messages({
            "string.empty": "El nombre del usuario es obligatorio"
        }),
        seccion: Joi.number()
    })
}

module.exports = {schemas};