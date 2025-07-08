
const{verify,verifyandAuth, verifyandAdmin}=require("./Verify.js")
const bcrypt=require("bcrypt")
const User = require("../model/User")
router=require("express").Router()



router.put("/:id",verifyandAuth,async(req,res)=>{
   if(req.body.password){
    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt)
   }
   try{
    const updateduser=await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json(updateduser)

   }catch(e){
    res.status(400).json("error")
   }

})
//delete
router.delete("/:id",verifyandAuth,async(req,res)=>{
    try{
        const deleteuser=await User.findByIdAndDelete(req.params.id)
        !deleteuser&&res.status(300).json("not found");
        res.status(200).json("deleted")

    }
    catch(e){
        res.status(400).json("error");

    }
})
//get

router.get("/find/:id",verifyandAdmin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        !user&&res.status(300).json("not found");
        const{password,...others}=user._doc;

        res.status(200).json(others)

    }
    catch(e){
        res.status(400).json("error");

    }
})
//get all
router.get("/",verifyandAdmin,async(req,res)=>{
    try{
        const query=req.query.new
        const user=query?await User.find().sort({_id:-1}).limit(3):await User.find()
        !user&&res.status(300).json("not found");
        // const{password,...others}=user._doc;

        res.status(200).json(user)

    }
    catch(e){
        console.log(e)
        res.status(400).json("error",e);

    }
})
//get stats
router.get("/stats",async(req,res)=>{
    const date=new Date();
    const lastyear= new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data=await User.aggregate([
            {
                $match:{ createdAt:{$gte:lastyear}}
            },
            {
                $project:{
                    month:{$month:"$createdAt"}
                }
            },{
                $group:{
                    _id:"$month",
                     total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    }
    catch(e){
        console.log(e)
        res.status(300).json("error")
    }
})







module.exports=router