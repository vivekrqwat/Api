
const{verify,verifyandAuth}=require("./Verify.js")
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








module.exports=router