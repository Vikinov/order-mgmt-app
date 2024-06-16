const jwt = require("jsonwebtoken");
const db = require("../data/database");

const authenticationMiddleware = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;
        if (!authorization) {
            return res.status(403).json({
                error: "Invalid authentication token"
            });
        }
        const token = authorization.split(" ")[1];
        const blacklistedTokens = await db.getData("/blacklistedTokens");
        if (blacklistedTokens.includes(token)) {
            return res.status(403).json({
                error: "Invalid authentication token"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals = {
            username: decoded.username,
            email: decoded.email,
            id: decoded.id,
        };
    } catch (error) {
        res.status(403).json({
            error
        });
        return;
    }
    
    next();
};

module.exports = authenticationMiddleware;
