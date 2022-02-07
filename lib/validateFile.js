const validateMimetype = (validMimetypes, mimetype) => {
    if(!validMimetypes.includes(mimetype)) {
        return false;
    }

    return true;
};

module.exports = {
    validateMimetype
};