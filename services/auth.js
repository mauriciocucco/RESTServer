const { emailAndStatusValidator } = require("../lib/userValidators");
const validatePassword = require("../lib/validatePassword");
const createJWT = require("../lib/createJWT");

const loginUser = async (req) => {
    try {
        const { email, password } = req.body;
        const user = await emailAndStatusValidator(email);

        validatePassword(password, user.password);

        const token = await createJWT({ uid: user.id });

        return ({ user, token });

    } catch (error) {
        throw error;
    }
};

module.exports = {
    loginUser
};