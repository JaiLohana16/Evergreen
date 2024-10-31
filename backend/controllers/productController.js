import {v2 as coludinary} from "cloudinary"
import productModel from "../models/productModel.js"
// add products

export const addProduct= async (req,res) => {
    try {
        const {name,description ,price,category,subCategory,colours,bestseller}=req.body
        
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]


        const images=[image1,image2,image3,image4].filter((item)=>item !=undefined)

        // so if suppose any image is not provided like for image 1 image 2 is proided but 3 and 4 is not given so then also it should work otw if we dont do this then if all the images are not given it will say undefined undefined for image3 and image4 so we are filtering and storing it in images only the images which are available 

        let imagesURL=await Promise.all(
            images.map(async(item)=>{
                let result = await coludinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        // Promise.all, the result of images.map will be an array of promises, not actual URLs. Since you're not awaiting all the promises together, the code execution will move forward without waiting for all uploads to complete.

        // The array imagesURL will contain unresolved promises rather than the actual image URLs. To get the URLs, you'd still need to await each promise later, which would be inefficient and harder to manage.
        
        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller==="true"?true:false,
            // before sending the array we have to convert it into string using json.stringify() when we get string then we again have to parse it and convert it into an array      from frontend the form data will be sent and converted into string using json.stringify() and in backend we are again converting it to array 
            colours:JSON.parse(colours),
            image:imagesURL,
            date:Date.now()  
        }

        const newProduct=await productModel.create(productData)   
        res.json({success:true,messages:"Product"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
}



export const listProducts=async (req,res) => {
    try {
        const products=await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
}



export const removingProduct=async (req,res) => {
    try {
        const{id}=req.body
    await productModel.findByIdAndDelete(id)   
    res.json({success:true,message:"Product Removed"})
    } catch (error) {
        res.json({success:false,message:error.message})
     
    }
    
}



export const singleProduct=async (req,res) => {
    try {
        const{productId}=req.body
        const product =await productModel.findById({productId})
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,message:error.message})
    }    
}

