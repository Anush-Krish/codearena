const problemService = require('../services/problem.service');
const executorService = require('../services/executor.service');

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

const runCode = async (req, res) => {
    const {code, input = '', language} = req.body;

    try {
        let output;
        if (language === 'cpp') {
            output = await executorService.executeCpp(code, input);
        } else {
            return res.status(400).json({error: 'Unsupported language'});
        }
        res.json({output});
    } catch (err) {
        console.error('Failed to execute.', err.toString());
        res.status(500).json({error: err.toString()});
    }
};

const submit = async (req, res) => {
    const {code, language, problemId} = req.body;
    const userId = req.user.id;

    try {
        const result = await executorService.submitSolution({
            userId, problemId, code, language
        });
        res.json({message: 'Submission successful', result});
    } catch (err) {
        console.error('Failed to execute and save.', err.toString());
        res.status(500).json({error: 'Execution failed', detail: err.toString()});
    }
};

module.exports = {create, getAllProblem, getProblem, runCode, submit};
