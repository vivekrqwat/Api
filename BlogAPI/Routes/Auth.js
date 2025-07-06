const User = require("../Models/User");

const bcrypt=require("bcrypt")

const router = require("express").Router();

// Register
router.post("/reg", async (req, res) => {
  try {
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(req.body.password,salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// LOGIN (to be implemented)
router.post("/login",async (req,res)=>{
    try{
        const uname=req.body.username;
        const user= await User.findOne({username:uname});
        !user&&res.status(400).json("wrong credential")
        const validate=await bcrypt.compare(req.body.password,user.password);
         !validate&&res.status(400).json("wrong credential")
         const{password,...others}=user._doc
         res.status(200).json(others)

    }catch(e){
         res.status(500).json({ error: e.message });
    }
})
//

module.exports = router;