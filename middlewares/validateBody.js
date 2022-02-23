const { validationResult } = require("express-validator");

const validateBody = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error();
        
        error.validationErrors = errors.array();
        error.status = 400;
        
        return next(error);
    }

    next();

};

module.exports = validateBody;