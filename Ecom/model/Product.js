const mg=require("mongoose")

const Product=new mg.Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true,
        unique:true
    },
    img:{
        type:String,
        require:true
    },
     category:{
        type:Array,
        
    },
     size:{
        type:String,
        
    },
     color:{
        type:String,
       
    },
     price:{
        type:Number,
        require:true
    },
  

},{timestamps:true})
module.exports=mg.model("Product",Product)