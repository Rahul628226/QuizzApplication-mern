const quizRouter = require('express').Router();
// const Quiz = require('../model/QuizQuestion');
const quizModel = require('../model/QuizQuestion');

quizRouter.post('/quizQuestion',async(req,res)=>{
    try{
        const {userId,topic,sub,duration,questions,status } = req.body;
        const quiz = new quizModel({
            userId,
            topic,
            sub,
            duration,
            questions,
            status,
        });
        await quiz.save();
        res.status(201).json({message:'Quiz data saved successfully'});
    }
    catch(err){
        res.status(500).json({ error: 'An error occurred while saving quiz data' });
    }
});

quizRouter.get('/quiz',async(req,res)=>{
    try{
        const data = await quizModel.find();
        res.json(data);

    }
    catch(err){
        res.status(500).json(err);
    }
});

quizRouter.put('/quizupdate/:id' , async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedQuizData = req.body;
        const updatedQuiz = await quizModel.findByIdAndUpdate(id,updatedQuizData, { new: true });
        res.json(updatedQuiz);
    }
    catch(err){
        res.status(500).json({ error: 'Failed to update the quiz' });
    }
} )

quizRouter.delete('/questionDelete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await quizModel.findByIdAndDelete(id);
        res.json("Deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = quizRouter;