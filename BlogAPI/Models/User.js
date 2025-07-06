const mongoose=require("mongoose");
const User=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true,

    },
    Profilepic:{
        type:String,
        default:""
    },


},{timestamps:true})

module.exports=mongoose.model("Users",User)