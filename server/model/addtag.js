const mongoose = require('mongoose');

const ModulesSchema = new mongoose.Schema({
 
    moduleName: {
        type: String,
        required: true,
       
      },


});

const tagSchema = new mongoose.Schema({

    tagName: {
        type: String,
        required: true,
       
      },
      description: {
        type: String,
        required: true,
      },
      dateCreated: {
        type: Date,
        default: Date.now,
      },
  
  modules: [ModulesSchema],
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
