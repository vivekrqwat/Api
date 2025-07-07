const mg=require("mongoose")

const User=new mg.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isAdin:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
module.exports=mg.model("User",User)