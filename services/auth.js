const { emailAndStatusValidator } = require("../lib/dbValidators");
const validatePassword = require("../lib/validatePassword");

const loginUser = async (req) => {
    const { email, password } = req.body;

    try {
        const user = await emailAndStatusValidator(email);

        validatePassword(password, user.password);

    } catch (error) {
        throw error;
    }
};

module.exports = {
    loginUser
};