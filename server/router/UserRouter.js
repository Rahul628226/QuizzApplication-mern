const UserRouter = require('express').Router();
const UserModel = require('../model/UserModel');

UserRouter.post('/reg',async(req,res)=>{
    try{
        const data = await UserModel(req.body);
        data.save();
        res.json("Success");
    }
    catch(err){
        res.status(500).json(err);
    }
})

UserRouter.post('/login' ,(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password == password){
                res.json("Success");

            }
            else{
                res.json("The Password is incorrect");
            }
        }
        else{
            res.json("user not found");
        }
    })
    .catch(err=>{
        res.status(500).json(err);
    });
    
} );

UserRouter.get('/userdata', async(req,res)=>{
    try{
        const data = await UserModel.find();
        res.json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
});

UserRouter.put('/userUpdate/:id', async(req,res)=>{
    try{
        let id = req.params.id;
        const data = await UserModel.findByIdAndUpdate(id, req.body);
        data.save();
        res.json("success");
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = UserRouter;