const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    problemId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Problem'},
    code: String,
    language: String,
    passedCount: Number,
    totalTestCases: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);
