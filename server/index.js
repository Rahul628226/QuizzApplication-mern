const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// router
const userRegRoutes = require('./router/UserRouter');
const quizRouters = require('./router/QuizQuestion');

const app = new express();


// database
mongoose.connect("mongodb+srv://abinseb09:abinseb09@cluster0.2xp4bal.mongodb.net/QuizzAppDB?retryWrites=true&w=majority")
.then(()=>{
    console.log("Database Connected");
})
.catch(err=>console.log(err));

// midleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

// route
app.use(userRegRoutes);

const tagRouter=require('./router/addtags')
app.use('/',tagRouter);

const resultRouter=require('./router/results')
app.use('/',resultRouter)

app.use(quizRouters);

// port
app.listen(4010,()=>{
    console.log("App is running in port 4010");
})
