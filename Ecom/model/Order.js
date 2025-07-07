const mg=require("mongoose")

const Order=new mg.Schema({
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
   ],
   amount:{
    type:Number,
    require:true
   },
   address:{
    type:Object,
    require:true
   },
   status:{
    type:String,
    default:"pending"
   }
  
  

},{timestamps:true})
module.exports=mg.model("Order",Order)