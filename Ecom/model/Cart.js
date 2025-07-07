const mg=require("mongoose")

const Cart=new mg.Schema({
    Userid:{
        type:String,
        require:true
    },
   products:[
    {
        pid:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }
   ]
  
  

},{timestamps:true})
module.exports=mg.model("Cart",Cart)