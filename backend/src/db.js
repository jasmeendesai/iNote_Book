const mongoose = require('mongoose')

const connectMongo = (MONGODB_STRING)=>{
    
    mongoose.connect(MONGODB_STRING,{
        useNewUrlParser : true
    })
    .then(()=>
        console.log("MongoDb is connected")
    ).catch((err)=> console.log(err.message))

  
}

module.exports = {connectMongo}