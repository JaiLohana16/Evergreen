import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer"

    if (!token) {
      return res.json({ success: false, message: "Not Authorized Admin" });
    } else {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(token_decode)
      if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "Not Authorized" });
      }
      next();
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
