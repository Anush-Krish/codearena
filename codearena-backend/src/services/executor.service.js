const Problem = require('../models/problem.model');
const Submission = require('../models/submission.model');

const {v4: uuid} = require('uuid');
const fs = require('fs-extra');
const path = require('path');
const {exec} = require('child_process');

const tempDir = path.join(__dirname, 'temp');
fs.ensureDirSync(tempDir);

const executeCpp = (code, input = '') => {
    const jobId = uuid();
    const filePath = path.join(tempDir, `${jobId}.cpp`);
    const execPath = path.join(tempDir, `${jobId}.out`);
    const inputPath = path.join(tempDir, `${jobId}.txt`);

    return new Promise((resolve, reject) => {
        fs.writeFileSync(filePath, code);
        fs.writeFileSync(inputPath, input);

        exec(`g++ ${filePath} -o ${execPath}`, (err, stdout, stderr) => {
            if (err || stderr) {
                cleanup();
                return reject(`Compilation Error:\n${stderr}`);
            }

            // Execute with timeout
            exec(`timeout 10s ${execPath} < ${inputPath}`, (err, stdout, stderr) => {
                cleanup();

                if (err) {
                    if (err.code === 124) {
                        return reject('Time Limit Exceeded');
                    }
                    return reject(`Runtime Error:\n${stderr}`);
                }

                if (stderr) return reject(stderr);
                resolve(stdout);
            });
        });

        const cleanup = () => {
            fs.remove(filePath);
            fs.remove(execPath);
            fs.remove(inputPath);
        };
    });
};


const submitSolution = async ({userId, problemId, code, language}) => {
    const problem = await Problem.findById(problemId).populate('tId');

    let passed = 0;

    for (const testCase of problem.tId) {
        try {
            const output = await executeCpp(code, testCase.tcList[0].Input);
            const trimmed = output.trim().replace(/\s+/g, '');
            const expected = testCase.tcList[0].Output.trim().replace(/\s+/g, '');

            if (trimmed === expected) {
                passed++;
            }
        } catch (e) {
            console.log("failed some test cases");
        }
    }

    const submission = await Submission.create({
        userId,
        problemId,
        code,
        language,
        passedCount: passed,
        totalTestCases: problem.tId.length,
    });

    return submission;
};


module.exports = {executeCpp, submitSolution}

