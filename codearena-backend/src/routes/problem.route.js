const express = require('express');
const router = express.Router();

const {problemDto} = require('../dtos/problem.dto');
const validateDto = require('../middlewares/validateDto.middleware');
const auth = require('../middlewares/auth.middleware');
const paginationParser = require("../middlewares/paginationParser.middleware")
const probController = require('../controller/problem.controller');

router.post('/', auth, validateDto(problemDto), probController.create);
router.get('/', paginationParser, probController.getAllProblem)
router.get('/:id', probController.getProblem);
router.post('/run', auth, probController.runCode);
router.post('/submit', auth, probController.submit);
router.post('/ai-review', auth, probController.aiReview);

module.exports = router;