const Joi = require('joi');

const userDto = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()

});

const loginUserDto = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).trim().required()
});

module.exports = {registerUserDto: userDto, loginUserDto};