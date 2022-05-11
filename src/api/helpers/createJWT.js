const jwt = require('jsonwebtoken')

const createJWT = (payload = {}) =>
    new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    const error = new Error('Error creating token.')

                    error.status = 500

                    return reject(error)
                }

                return resolve(token)
            }
        )
    })

module.exports = createJWT
