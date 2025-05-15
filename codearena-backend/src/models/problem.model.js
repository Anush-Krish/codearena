const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    tags: [String],
    difficulty: {type: String},
    sampleSol: [
        {
            Input: String,
            Output: String
        }
    ],
    tId: [{type: mongoose.Schema.Types.ObjectId, ref: 'testCase'}]
}, {
    timestamps: true
});

const Problem = mongoose.model('problem', problemSchema);
module.exports = Problem;
