const{Verify,verifyandAuth, verifyandAdmin}=require("./Verify.js")
const bcrypt=require("bcrypt")
const Order=require("../model/Order.js")
router=require("express").Router()

//cart crreat
router.post('/',Verify,async(req,res)=>{
    try{
        const newcorder= await Order(req.body)
        const saveorder=await newcorder.save();
        res.status(200).json(saveorder)
    }
    catch(e){
        res.status(400).json("error")
    }

})
//update
router.put("/:id",verifyandAdmin,async(req,res)=>{
    try{
        const updateorder=await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateorder)
    }
    catch(e){
        res.status(400).json("error")
    }
})
//delete
router.delete("/:id",verifyandAdmin,async(req,res)=>{
    try{
        const delorder=await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Product is deleted")
    }
    catch(e){
        res.status(400).json("error")
    }
})
//get
router.get("/find/:Userid",verifyandAuth,async(req,res)=>{
    try{
        const order=await Order.find({Userid:req.params.Userid})
        !order&&res.status(300).json("not found")
        res.status(200).json(order)
    }
    catch(e){
        res.status(400).json("error")
    }
})

//GET ALL
router.get("/",verifyandAdmin,async(req,res)=>{
    try{
        const order=await Order.find()
        !order&&res.status(300).json("not found")
        res.status(200).json(order)
    }
    catch(e){
        res.status(400).json("error")
    }
})
//get monthly income
router.get("/income",async(req,res)=>{
    try{
        const date=new Date();
        const lastmonth=new Date(date.setMonth(date.getMonth()-1));
        const prevmonth=new Date(new Date().setMonth(lastmonth.getMonth()-1));
        const income =await Order.aggregate([
          { $match:{createdAt:{$gte:prevmonth}}},
           {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                }
                
           },
           {
            $group:{
                _id:"$month",
                total:{$sum:"$sales"}
            }
           }
        ])
        res.status(200).json(income)
    }
    catch(e){
        res.status(300).json("error")
    }
})







module.exports=router