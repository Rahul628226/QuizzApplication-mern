const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    type:String

})

const UserModel = mongoose.model("User",RegisterSchema);
module.exports = UserModel;