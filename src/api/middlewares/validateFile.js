const validateFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        const error = new Error('No file was uploaded.')

        error.status = 400

        next(error)
    }

    next()
}

module.exports = validateFile
