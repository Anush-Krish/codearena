const express = require('express');
const router = express.Router();

const {problemDto} = require('../dtos/problem.dto');
const validateDto = require('../middlewares/validateDto.middleware');
const auth = require('../middlewares/auth.middleware');
const probController = require('../controller/problem.controller');

router.post('/', auth, validateDto(problemDto), probController.create);

module.exports = router;