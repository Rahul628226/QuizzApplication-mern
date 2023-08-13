const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tagName: {
    type: String,
    required: true,
  },
  subTopic: {
    type: String,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  correctCount: {
    type: Number,
    required: true,
  },
  incorrectCount: {
    type: Number,
    required: true,
  },
  notAttemptedCount: {
    type: Number,
    required: true,
  },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
