import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"; // Updated import
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Registered" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exist" });
        } else {
            if (!name || !email || !password) {
                return res.json({ success: false, message: "All Fields are Mandatory" });
            }
            if (!validator.isEmail(email)) { // Corrected email validation
                return res.json({ success: false, message: "Enter Valid Email Id" });
            }
            if (password.length < 8) {
                return res.json({ success: false, message: "Password must be of at least 8 characters" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await userModel.create({ name, email, password: hashedPassword });
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

