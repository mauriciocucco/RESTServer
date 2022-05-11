const verifyGoogleToken = require('../helpers/verifyGoogleToken')
const { loginUser } = require('../services/auth')
const verifyGoogleUser = require('../helpers/verifyGoogleUser')
const createJWT = require('../helpers/createJWT')

const validateToken = async (req, res, next) => {
    try {
        const token = await createJWT({ uid: req.authenticatedUser.id })

        res.json({ user: req.authenticatedUser, refreshToken: token })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { body } = req
        const { token, user } = await loginUser(body)

        res.json({
            user,
            token,
        })
    } catch (error) {
        next(error)
    }
}

const googleSignIn = async (req, res, next) => {
    try {
        const { idToken } = req.body

        const googleUser = await verifyGoogleToken(idToken)

        const response = await verifyGoogleUser(googleUser)

        res.json(response)
    } catch (error) {
        console.log('ERROR', error)

        next(error)
    }
}

module.exports = {
    login,
    googleSignIn,
    validateToken,
}
