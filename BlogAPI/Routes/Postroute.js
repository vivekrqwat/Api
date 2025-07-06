

const bcrypt=require("bcrypt");
const User = require("../Models/User");
const Post = require("../Models/Post");

const postrouter = require("express").Router();
//Create POSt
postrouter.post("/",async(req,res)=>{
    const newpost=await new Post(req.body)
    try{
        
        const savepost=await newpost.save()
        res.status(200).json("post have been saved")
        

    }catch(e){
        res.status(400).json("error")
    }
})

//updaet POST
postrouter.put("/:id",async(req,res)=>{
    try{
        const newpost=await Post.findById(req.params.id);
        
        try{
            if(newpost.username===req.body.username){
                const newpost1=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true}
            )

            }
            res.status(200).json(newpost)

        }catch(e){
             res.status(400).json("error in finding id")
        }


    }
    catch(e){
        res.status(400).json("error no user found")
    }

})



//delete post
postrouter.delete("/:id",async(req,res)=>{
    try{
        const newpost=await Post.findById(req.params.id);
        
        try{
            if(newpost.username===req.body.username){
                const newpost1=await Post.findByIdAndDelete(req.params.id)
            

            }
            res.status(200).json("deleted")

        }catch(e){
             res.status(400).json("error in finding id")
        }


    }
    catch(e){
        res.status(400).json("error no user found")
    }

})
//Get ALL

postrouter.get("/",async(req,res)=>{
        const username=req.query.user;
        const catname=req.query.cat;
    try{
        let post;
        if(username){
            post=await Post.find({username});
        }else if(catname){
            post=await Post.find({
                categories:{
                    $in:[catname]
                }
            })
        }else{
           post=await Post.find();
        }
        res.status(200).json(post)




    }catch(e){
        res.status(400).json("error")
    }
})






module.exports = postrouter;