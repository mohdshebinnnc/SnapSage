import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded; 
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access" });
    }
};

export default userAuth;