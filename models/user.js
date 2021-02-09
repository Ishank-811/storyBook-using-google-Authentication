const mongoose = require("mongoose"); 
const userSchema = new mongoose.Schema({
    
    GoogleId :{
        type:String, 
        required:true, 
    }, 
    displayName:{
        type:String, 
        required:true, 
    },
     FirstName :{
        type:String, 
        required:true, 
    },
    LastName :{
        type:String, 
        required:true, 
    },
    Image :{
        type:String,  
    },
    CreatedAt:{
        type : Date, 
        default:Date.now()
    }
})
module.exports = mongoose.model('user', userSchema)