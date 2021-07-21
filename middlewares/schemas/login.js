const Joi = require('@hapi/joi');

const schemas = {
    login: Joi.object().keys({
        email: Joi.string().email().required().messages({
            "string.empty": "El email de usuario es obligatorio"
        }),
        pass: Joi.string().min(3).max(20).required().messages({
            "string.empty" : "La pass es obligatoria",
            "string.min" : "La pass tiene que tener como minimo 3 caracteres",
            "string.max" : "La pass puede tener como maximo 20 caracteres"
        })
    })
}

module.exports = {schemas};