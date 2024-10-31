import express from "express"
import { listProducts,addProduct,removingProduct,singleProduct } from "../controllers/productController.js"
import { addReview, getReviews } from "../controllers/reviewController.js"; // Import your review controller
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const productRouter=express.Router()

productRouter.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
// phele user images1 name se es field main ek file upload karega image2 ke name se karega image3 ke name se karega and image4 ke name se karega and yeh jo fields hai image1 image2 image3 image4 yeh sab bhi ek array ke tarah hai yeh toh apne hai ke uss main sirf ek he image store karwa rahe but multiple images bhi bejh sakte hai so image1 ek array hai jis main apne ne ek he file dale hai 
productRouter.post("/remove",adminAuth,removingProduct)
productRouter.post("/single",singleProduct)
productRouter.get("/list",listProducts)

// Add review routes
productRouter.post("/review/add", addReview); // Add this route to submit a review
productRouter.get("/review/:productId", getReviews); // Add this route to fetch reviews for a product


export default productRouter

