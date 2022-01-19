const { response, request } = require("express");

const errorMessage = {
    error: 'authenticatedUser not found'
};

const isAdmin = (req = request, res = response, next) => {
    if(!req.authenticatedUser) {
        return res.status(500).json(errorMessage);
    };

    const { role } = req.authenticatedUser;

    if (role !== "ADMIN") {
        return res.status(401).json({
            error: "Access denied. You must be an admin."
        });
    }

    next();
};

const hasRole = (roles = []) => {
    return (req = request, res = response, next) => {
        if (!req.authenticatedUser) {
            return res.status(500).json(errorMessage)
        };

        const { role } = req.authenticatedUser;

        if (!roles.includes(role)) {
            return res.status(401).json({
                error: "Access denied. You must have the correct role."
            });
        }

        next();
    }; 
};

module.exports = {
    isAdmin,
    hasRole
};