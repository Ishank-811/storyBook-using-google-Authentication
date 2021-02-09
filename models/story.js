const mongoose = require("mongoose"); 


const storySchema = new mongoose.Schema({
    
    title:{
        type:String, 
        // required:true,
        trim:true,  
    }, 
    body: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
      },
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user'
    },
    
    CreatedAt:{
        type : Date, 
        default:Date.now()
    }
})
module.exports = mongoose.model('Story', storySchema)