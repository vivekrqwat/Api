const mongoose=require("mongoose");
const Post=new mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:false
    },
    username:{
        type:String
    },
    categories:{
        type:Array,
        require:false
    }
 


},{timestamps:true})

module.exports=mongoose.model("Posts",Post)