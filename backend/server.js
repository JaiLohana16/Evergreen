import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"

// App donfig
const app=express()
const port=process.env.PORT||3000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// API routes
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("Backend")
    res.status(200)
})





app.listen(port,()=>{
    console.log("The app is running on http://localhost:3000")
})