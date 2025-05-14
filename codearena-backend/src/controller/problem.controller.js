const problemService = require('../services/problem.service');

const create = async (req, res) => {
    try {
        const problem = await problemService.createProblem(req.body);
        return res.status(201).json({message: 'Problem created', problem});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

module.exports = {create};
