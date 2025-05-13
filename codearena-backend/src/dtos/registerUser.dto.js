const Joi = require('joi');

const registerUserDto = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()

});

module.exports = {registerUserDto};