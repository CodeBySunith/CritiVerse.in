const UserDB = require('../Models/UserModel');

const checkUserStatus = async (req, res, next) => {
    try {
        
        const user = await UserDB.findById(req.auth.id);

        if (!user) {
            return res.status(404).json({ msg: "User no longer exists" });
        }

        if (user.isBanned) {
            return res.status(403).json({ msg: "Access denied. Your account is banned." });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(500).json({ msg: "Server error during validation" });
    }
};

module.exports = checkUserStatus
