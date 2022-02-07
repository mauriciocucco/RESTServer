const User = require('../models/User');

const emailPostValidator = async (email = '') => {
     const emailExists = await User.findOne({ email });

     if(emailExists) {
         throw new Error('The email already exists.');
     };
};

const emailAndStatusValidator = async (email = '') => {
    const user = await User.findOne({ email });

    if(!user || !user.status) { //Verifica que el usuario exista y que esté activo
        throw {
            code: 400,
            error: 'The user does not exists.'
        };
    };

    return user;
};

const userExists = async (id = '') => {
    const user = await User.findById(id);

    if(!user) {
        throw new Error('The user does not exists.');
    };

    return user;
};

module.exports = {
    emailPostValidator,
    emailAndStatusValidator,
    userExists
};