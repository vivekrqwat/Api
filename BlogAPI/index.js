const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth=require("./Routes/Auth")
const userauth=require("./Routes/userroute")
const postauth=require("./Routes/Postroute")
const catauth=require("./Routes/Category")
const multer=require("multer")
dotenv.config();


app.use(express.json()) 


app.use("/api/auth",auth)
app.use("/api/user",userauth)
app.use("/api/post",postauth)
app.use("/api/cat",catauth)

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("uploaded")
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


//

app.listen("5000", () => {
  console.log("server 5000 is active");
});