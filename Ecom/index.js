const express=require("express")
const dotenv=require("dotenv")
const app=express();
const mongo=require("mongoose");
const auth=require("./Routes/Auth")
const user=require("./Routes/UserRoute")
const product=require("./Routes/Productroute");


dotenv.config();
app.use(express.json())

app.use("/api/auth",auth)
app.use("/api/users",user)
app.use("/api/product",product)



mongo.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));





app.listen("8000",()=>{
    console.log("server is at 8000")
})