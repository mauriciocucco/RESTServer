const bcryptjs = require('bcryptjs');

const validatePassword = (loginPassword, userPassword) => {
    const valid = bcryptjs.compareSync(loginPassword, userPassword);

    if(!valid) {
        throw {
            code: 400,
            error: 'The user does not exists.'
        };
    };
};

module.exports = validatePassword;