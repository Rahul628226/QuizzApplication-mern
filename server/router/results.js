const express = require('express');
const Result = require('../model/result'); // Assuming this is the path to your Result model
const resultRouter = express.Router();

// POST endpoint to save quiz results
resultRouter.post('/saveResult', async (req, res) => {
  try {
    const result = new Result(req.body);
    const savedResult = await result.save();
    res.json(savedResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET endpoint to retrieve quiz results
resultRouter.get('/getResults', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = resultRouter;
