const{Verify,verifyandAuth, verifyandAdmin}=require("./Verify.js")
const bcrypt=require("bcrypt")
const Product=require("../model/Product.js")
const User = require("../model/User.js")
const Cart = require("../model/Cart.js")
router=require("express").Router()

//cart crreat
router.post('/',Verify,async(req,res)=>{
    try{
        const newcart= await Cart(req.body)
        const savecart=await newcart.save();
        res.status(200).json(savecart)
    }
    catch(e){
        res.status(400).json("error")
    }

})
//update
router.put("/:id",verifyandAuth,async(req,res)=>{
    try{
        const updatecart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatecart)
    }
    catch(e){
        res.status(400).json("error")
    }
})
//delete
router.delete("/:id",verifyandAuth,async(req,res)=>{
    try{
        const delcart=await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product is deleted")
    }
    catch(e){
        res.status(400).json("error")
    }
})
//get
router.get("/find/:Userid",verifyandAuth,async(req,res)=>{
    try{
        const cart=await Cart.findOne({Userid:req.params.Userid})
        !cart&&res.status(300).json("not found")
        res.status(200).json(cart)
    }
    catch(e){
        res.status(400).json("error")
    }
})

//GET ALL
router.get("/",verifyandAuth,async(req,res)=>{
    try{
        const cart=await Cart.find()
        !cart&&res.status(300).json("not found")
        res.status(200).json(cart)
    }
    catch(e){
        res.status(400).json("error")
    }
})







module.exports=router