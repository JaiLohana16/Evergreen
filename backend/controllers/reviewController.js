import productModel from "../models/productModel.js"
import mongoose from 'mongoose';

// Add Review
export const addReview = async (req, res) => {
    try {
        const { productId, name, review } = req.body;

        // Check if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        // Find product by ObjectId
        const product = await productModel.findById(productId); // Use findById if productId is an ObjectId
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        if (!product.reviews) {
            product.reviews = [];
        }

        product.reviews.push({ name, review });
        await product.save();

        res.json({ success: true, message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch Reviews
export const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        // Use findById or findOne to get a single product
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, reviews: product.reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
