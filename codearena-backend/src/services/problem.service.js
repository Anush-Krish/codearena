const Problem = require('../models/problem.model');
const TestCase = require('../models/testcase.model');

const createProblem = async ({title, description, tags, difficulty, sampleSol, testCases}) => {
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


const fetchAllProblems = async (pagination, query) => {
    const {page, limit} = pagination;
    const {difficulty, tags} = query;

    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (tags) filter.tags = {$all: tags.split(',')};

    const problems = await Problem.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    const total = await Problem.countDocuments(filter);

    return {
        problems,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
};

const getProblemById = async (id) => {
    return await Problem.findById(id);
};


module.exports = {createProblem, fetchAllProblems, getProblemById};