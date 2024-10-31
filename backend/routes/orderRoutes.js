import express from "express"
import { placeOrder,placeOrderEasyPaisa,placeOrderJazzCash,allOrders,userOrders,updateStatus } from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter=express.Router()
// Admin Features
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

// Payment Featuers
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/Easy",authUser,placeOrderEasyPaisa)
orderRouter.post("/Jazz",authUser,placeOrderJazzCash)

// user features
orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter