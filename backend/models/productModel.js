import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    review: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    colours: { type: [String], required: true },
    image: { type: Array, required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    reviews: [reviewSchema],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
