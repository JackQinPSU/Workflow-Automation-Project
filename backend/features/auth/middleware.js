import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; //Bearer <token>

    if (!token) {
        return res.status(401).json({ error: 'Token missing!'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};