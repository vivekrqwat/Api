const{verify,verifyandAuth, verifyandAdmin}=require("./Verify.js")
const bcrypt=require("bcrypt")
const Product=require("../model/Product.js")
const User = require("../model/User.js")
router=require("express").Router()

//Create
router.post("/",verifyandAdmin,async(req,res)=>{
    try{
        const newproduct= await new Product(req.body)
        await newproduct.save();
        res.status(200).json(newproduct)
    }
    catch(e){
   
        res.status(400).json('error')
    }
})
//update
router.put("/:id",verifyandAdmin,async(req,res)=>{
    try{
      const updatedproduct=await Product.findByIdAndUpdate(req.params.id,{
        $set:req.body
      },{new:true})
      res.status(200).json(updatedproduct)
    }
    catch(e){
        res.status(400).json('error')
    }
})
//delete
router.delete("/:id",verifyandAdmin,async(req,res)=>{
    try{
      const deleteddproduct=await Product.findByIdAndDelete(req.params.id)
      res.status(200).json(deleteddproduct)
    }
    catch(e){
        res.status(400).json('error')
    }
})
//get product
router.get("/find/:id",verifyandAdmin,async(req,res)=>{
    try{
      const product1=await Product.findById(req.params.id)
      res.status(200).json(product1)
    }
    catch(e){
        res.status(400).json('error')
    }
})
//get all
router.get("/",async(req,res)=>{
    const newque=req.query.new
    const cat=req.query.cat
    // console.log(cat);
    try{
        let products;
      if(newque){
       products= await Product.find().sort({createdAt:-1}).limit(5)
      }else if(cat){
       products= await Product.find({category:{
        $in:[cat]
       }})
      }else{
        products=await Product.find();
      }
      res.status(200).json(products)

    }
    catch(e){
        console.log(e)
        res.status(400).json('error',)
    }
})







module.exports=router