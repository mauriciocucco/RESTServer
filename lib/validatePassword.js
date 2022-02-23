const bcryptjs = require('bcryptjs');

const validatePassword = (loginPassword, userPassword) => {
    const valid = bcryptjs.compareSync(loginPassword, userPassword);

    if(!valid) {
        const error = new Error('The user does not exists.');
        
        error.status = 400;

        throw error;
    };
};

module.exports = validatePassword;