const JWT = require('jsonwebtoken');
const UserDB = require('../Models/UserModel');

const AuthMW = async (req, res, nextfn) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await UserDB.findById(decoded.id);
        req.user = user; 
        req.auth = decoded;
        nextfn();
    } catch (e) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};

module.exports = AuthMW