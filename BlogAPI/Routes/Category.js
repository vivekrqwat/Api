const Category = require("../Models/Category");




const catrouter = require("express").Router();
//Create POSt


catrouter.post("/",async(req,res)=>{
const newcat= await new Category(req.body)
try{
   const save= await newcat.save();
    res.status(200).json(save)

}
catch(e){
    res.status(400).json("error",e)
}

})
//
catrouter.get("/",async(req,res)=>{

try{
   const save= await Category.find();
    res.status(200).json(save)

}
catch(e){
    res.status(400).json("error",e)
}

})




module.exports = catrouter;