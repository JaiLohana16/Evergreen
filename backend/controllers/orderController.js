import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
// placing orders with COD
export const placeOrder=async(req,res)=>{
    try {
        const {userId,items,amount,userDetails} =req.body
        const orderData={userId,items,userDetails,amount,paymentMethod:"COD",payment:false,date:Date.now()}
        await orderModel.create(orderData)
          // Clear cart data after order is placed
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// placing orders with EasyPaisa
export const placeOrderEasyPaisa=async(req,res)=>{
     res.json({success:false,message:"Currently we do not accept payments via this mode please use Cash On Delivery"})
}

// placing orders with JazzCash
export const placeOrderJazzCash=async(req,res)=>{
     res.json({success:false,message:"Currently we do not accept payments via this mode please use Cash On Delivery"})
}


// All orders data for admin panel 

export const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}



// All orders data for particular user

export const userOrders=async(req,res)=>{
    try {
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }    
}



// update order Status from admin panel

export const updateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }   
}