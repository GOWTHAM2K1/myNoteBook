const mongoose = require('mongoose')
const mongooseUri = 'mongodb://127.0.0.1:27017/mynotebook'
const connectToMoongo = ()=>{
    mongoose.connect(mongooseUri);
      
      
}

module.exports = connectToMoongo;