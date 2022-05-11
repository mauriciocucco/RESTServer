const jwt = require('jsonwebtoken')
const { showUser } = require('../services/users')

const verifyToken = async (token) => {
    try {
        if (!token) {
            return null
        }

        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await showUser({ _id: uid })

        if (user && user.status) {
            return user
        }

        return null
    } catch (error) {
        return null
    }
}

module.exports = verifyToken
