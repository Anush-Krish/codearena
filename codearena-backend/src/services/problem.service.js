const Problem = require('../models/problem.model');
const TestCase = require('../models/testcase.model');

const createProblem = async ({ title, description, tags, difficulty, sampleSol, testCases }) => {
    const problem = new Problem({
        title,
        description,
        tags,
        difficulty,
        sampleSol,
        tId: []
    });

    const savedProblem = await problem.save();

    const savedTestCases = await TestCase.insertMany(
        testCases.map(tc => ({
            pId: savedProblem._id,
            tcList: [tc]
        }))
    );

    savedProblem.tId = savedTestCases.map(tc => tc._id);
    await savedProblem.save();

    return savedProblem;
};
module.exports = {createProblem};