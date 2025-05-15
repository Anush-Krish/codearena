const problemService = require('../services/problem.service');

const create = async (req, res) => {
    try {
        const problem = await problemService.createProblem(req.body);
        return res.status(201).json({message: 'Problem created', problem});
    } catch (err) {
        console.log('Error creating problem', err.message)
        return res.status(500).json({message: err.message});
    }
};

const getAllProblem = async (req, res) => {
    try {
        const result = await problemService.fetchAllProblems(req.pagination, req.query);
        return res.status(200).json({result})
    } catch (err) {
        console.log('Error fetching problems', err.message)
        return res.status(500).json({message: err.message});
    }
}
const getProblem = async (req, res) => {
    try {
        const problem = await problemService.getProblemById(req.params.id);
        if (!problem) return res.status(404).json({message: 'Problem not found'});
        res.status(200).json(problem);
    } catch (err) {
        console.log('Error fetching problems', err.message)
        res.status(500).json({message: err.message});
    }
};


module.exports = {create, getAllProblem, getProblem};
