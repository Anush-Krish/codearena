const mongoose = require('mongoose')

const testCaseSchema = new mongoose.Schema({
    pId: {type: mongoose.Schema.Types.ObjectId, ref: 'problem'},
    tcList: [
        {
            Input: String,
            Output: String
        }
    ]

});


const TestCase = new mongoose.model('testCase', testCaseSchema);

module.exports = TestCase;