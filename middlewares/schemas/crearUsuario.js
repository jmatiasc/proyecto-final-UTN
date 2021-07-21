const Joi = require('@hapi/joi'); //npm i @hapi/joi.js

const schemas = {
    crearUsuario: Joi.object().keys({
        nombre: Joi.string().required().messages({
            "string.empty": "El nombre del usuario es obligatorio"
        }),
        apellido: Joi.string().required().messages({
            "string.empty": "El apellido del usuario es obligatorio"
        }),
        pass: Joi.string().min(3).max(20).required().messages({
            "string.empty" : "La pass es obligatoria",
            "string.min" : "La pass tiene que tener como minimo 3 caracteres",
            "string.max" : "La pass puede tener como maximo 20 caracteres"
        }),
        email: Joi.string().email().required().messages({
            "string.empty" : "La email del usuaior debe ser obligatorio",
        }),
        admin: Joi.number().max(1).messages({
            "string.max" : "Error de admin"
        })
    })
}

module.exports = {schemas};