// add products to user cart

import userModel from "../models/userModel.js"
export const addToCart=async(req,res)=>{
    try {
        const {userId,itemId,colour}=req.body

        const userData =await userModel.findById(userId)
        let cartData =await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][colour]) {
                cartData[itemId][colour]+=1
            }
            else{
                cartData[itemId][colour]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][colour]=1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// update products to user cart

export const updateCart=async(req,res)=>{
    try {
        const {userId,itemId,colour,quantity}=req.body
        const userData =await userModel.findById(userId)
        let cartData =await userData.cartData

        cartData[itemId][colour]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// get user cart data

export const getUserCart=async(req,res)=>{
    try {
        const{userId}=req.body
        const userData =await userModel.findById(userId)
        let cartData =await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }    
}
