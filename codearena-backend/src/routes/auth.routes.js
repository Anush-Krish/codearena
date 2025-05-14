const express = require('express');
const router = express.Router();
const {registerUserDto, loginUserDto} = require('../dtos/user.dto');
const validateDto = require('../middlewares/validateDto.middleware');
const userController = require('../controller/auth.controller');

router.post('/register', validateDto(registerUserDto), userController.register);
router.post('/login', validateDto(loginUserDto), userController.login);

module.exports = router;