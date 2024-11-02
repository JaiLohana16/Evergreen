import jwt from "jsonwebtoken"
const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Admin" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (token_decode.email !== process.env.ADMIN_EMAIL || !token_decode.isAdmin) {
            return res.json({ success: false, message: "Not Authorized" });
        }
        
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
