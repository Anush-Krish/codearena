const Joi = require('joi');

const testCaseDto = Joi.object({
    Input: Joi.string().required(),
    Output: Joi.string().required()
});

const problemDto = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().allow(''),
    tags: Joi.array().items(Joi.string()),
    difficulty: Joi.string().valid('Easy', 'Medium', 'Hard'),
    sampleSol: Joi.array().items(testCaseDto).min(1),
    testCases: Joi.array().items(testCaseDto).min(1)
});

module.exports = {problemDto};
