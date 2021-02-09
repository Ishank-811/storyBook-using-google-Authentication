const mongoose = require("mongoose"); 

const mongoconn=async()=>{
    try{
    mongoose.connect("mongodb://localhost:27017/BookStory", {useNewUrlParser:true , 
useUnifiedTopology:true , useCreateIndex:true})
    console.log(`connection is sucessfull`); 
}catch(e){
    console.log(e); 
}
};
module.exports  = mongoconn; 