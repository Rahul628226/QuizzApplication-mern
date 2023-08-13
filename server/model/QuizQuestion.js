const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { 
        type:String,
        required:true
    },
    options :[String],
    correctAnswer:{ 
        type:String,
        required:true
    }
});

const qiuzSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },

    topic:{
        type:String,
        require:true
    },
    sub:{
        type:String,
        
    },
    duration:{
        type:Number,
        required:true
    },
    questions:[questionSchema],
    status:{
        type:String,
    },
});

const Quiz = mongoose.model('Quiz',qiuzSchema);
module.exports = Quiz;

