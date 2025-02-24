import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }   
        res.status(401).json({ message: "Not authorized" });
    }
};