

const bcrypt=require("bcrypt");
const User = require("../Models/User");
const Post = require("../Models/Post");

const userrouter = require("express").Router();

//update
userrouter.put("/:id",async(req,res)=>{
    console.log(req.params.id)
    if(req.body.userid==req.params.id){
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updateduser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },   { new: true })
            const{password,...other}=updateduser._doc
            res.status(200).json(other)

        }
        catch(e){
            res.status(400).json("error")
        }


    }else{
        res.status(400).json("not found");
    }

})




//delete
userrouter.delete("/:id",async(req,res)=>{

     if(req.body.userid==req.params.id){
        try{
            const userp=await User.findById(req.params.id);




         try{
            await Post.deleteMany({username:userp.username})
            
        await User.findOneAndDelete(req.params.id)
            res.status(200).json("deleted")

        }
        catch(e){
            res.status(400).json("error")
        }

        }catch(e){
             res.status(400).json("cannot find user")
        }  
      



    }else{
        res.status(400).json("not found");
    }

    
})
//get user
userrouter.get("/:id",async(req,res)=>{
try{
const user=await User.findById(req.params.id);
!user&&res.status(400).json("not found")
const{password,...others}=user._doc
res.status(200).json(others)



}
catch(e){
    res.status(200).json("error")
}

})








module.exports = userrouter;