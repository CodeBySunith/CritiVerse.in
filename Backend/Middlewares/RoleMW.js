const authorize = (roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized: No user found" });
        }

        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                msg: `Forbidden: You need ${allowedRoles.join(' or ')} permissions` 
            });
        }
        
        next();
    };
};

module.exports = authorize;
