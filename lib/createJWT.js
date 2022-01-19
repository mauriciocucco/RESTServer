const jwt = require('jsonwebtoken');

const createJWT = ( payload = {}) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if(err) {
                console.log('ERROR', err);

                return reject({ 
                    code: 500, 
                    error: 'Internal server error' 
                });
            }

            return resolve(token);
        });
    });
};

module.exports = createJWT;