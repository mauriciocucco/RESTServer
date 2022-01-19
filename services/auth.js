const { emailAndStatusValidator } = require("../lib/dbValidators");
const validatePassword = require("../lib/validatePassword");
const createJWT = require("../lib/createJWT");

const loginUser = async (req) => {
    const { email, password } = req.body;

    try {
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