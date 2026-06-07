// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const auth = (requiredRole) => {
    return (req, res, next) => {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Role check
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Forbidden: insufficient role" });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
    };
};

module.exports = auth;
