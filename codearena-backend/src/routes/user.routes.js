const express = require('express');
const router = express.Router();
const {registerUserDto} = require('../dtos/registerUser.dto');
const validateDto = require('../middlewares/validateDto.middleware');
const userController = require('../controller/user.controller');

router.post('/register', validateDto(registerUserDto), userController.register);

module.exports = router;