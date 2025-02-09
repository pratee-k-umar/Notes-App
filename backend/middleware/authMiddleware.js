import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. Invalid token format." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired. Please login again." });
      }
      return res.status(401).json({ message: "Invalid token." });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: "Server error in authentication." });
  }
};

export default authMiddleware;
