const { emailAndStatusValidator } = require('../validations/userValidators')
const validatePassword = require('../validations/validatePassword')
const createJWT = require('../helpers/createJWT')

const loginUser = async (reqBody) => {
    try {
        const { email, password } = reqBody
        const user = await emailAndStatusValidator(email)

        validatePassword(password, user.password)

        const token = await createJWT({ uid: user.id })

        return { user, token }
    } catch (error) {
        console.log('LOGIN USER ERROR: ', error)
        throw error
    }
}

module.exports = {
    loginUser,
}
