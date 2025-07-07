const User = require("../model/User")
const bcrypt=require("bcrypt")

router=require("express").Router()
const jwt=require("jsonwebtoken");
//reg
router.post("/",async (req,res)=>{
    try{
    const user=req.body
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt);
    const newuser= await new User({
        username:user.username,
        email:user.email,
        password:user.password

    })
    await newuser.save()
        res.status(200).json(newuser)
}
    catch(er){
        res.status(300).json("error",er)
    }

})
//login
router.post("/login",async(req,res)=>{
    const user=req.body;
    
   
    try{
    const uid=await User.findOne({email:req.body.email})
       !uid&& res.status(400).json("wrong password")
    const check=await bcrypt.compare(req.body.password,uid.password)
   !check&&res.status(400).json("wrong credential")
        const accesstoken=jwt.sign({
            id:uid._id,
            isAdmin:uid.isAdmin
        },process.env.JWT_TOKEN,{
            expiresIn:"3d"
        })

     const{password,...others}=uid._doc

    res.status(200).json({others,accesstoken})

    }catch(e){
        console.log(e)
        res.status(400).json(e)
    }
})





module.exports=router