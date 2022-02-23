
function notFound(req, res, next) {
    const error = new Error("Route not found.");

    error.status = 404;

    next(error);
}

function generalErrors (err, req, res, next) {

    if (!err) { //no hay error
        return next();    
    }

    console.log('ERROR DESDE EL HANDLER: ', err);

    if (err.validationErrors) {
        return res.status(err.status).json({ errors: err.validationErrors });
    }

    res.status(err.status || 500).json({ error: err.message || 'Internal server error.' });
}

module.exports = {
    notFound,
    generalErrors
}