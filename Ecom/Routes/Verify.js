const jwt=require("jsonwebtoken")
const Verify=(req,res,next)=>{

    const Header=req.headers.token
    if(Header){
        const token=Header.split(" ")[1]
        console.log(token)
        jwt.verify(token,process.env.JWT_TOKEN,(er,user)=>{
            if(er) return res.status(400).json("some error in token")
                // console.log(user)
                req.user=user
            next();

        })
    }
    else{
        return res.status(400).json("error no token found")
    }
}

const verifyandAuth=(req,res,next)=>{
    Verify(req,res,()=>{
        console.log(req.user.id);
      if(req.user.id===req.params.id||req.user.isAdmin){
        next();
    }
    else{
        res.status(400).json("auth error")
    }
    })
}



const verifyandAdmin=(req,res,next)=>{
    Verify(req,res,()=>{
        // console.log(req.user);
      if(req.user.isAdmin){
        next();
    }
    else{
        res.status(400).json("you r no admin")
    }
    })
}



module.exports={Verify,verifyandAuth,verifyandAdmin}