const User = require('../models/User');

const emailPostValidator = async (email = '') => {
     const emailExists = await User.findOne({ email });

     if(emailExists) {
         const error = new Error('The email already exists.');

         throw error;
     };
};

const emailAndStatusValidator = async (email = '') => {
    const user = await User.findOne({ email });

    if(!user || !user.status) { //Verifica que el usuario exista y que esté activo
        const error = new Error('The user does not exists.');
        
        error.status = 400;

        throw error;
    };

    return user;
};

const userExists = async (id = '') => {
    const user = await User.findById(id);

    if(!user) {
        const error = new Error('The user does not exists.');

        error.status = 400;

        throw error;
    };

    return user;
};

module.exports = {
    emailPostValidator,
    emailAndStatusValidator,
    userExists
};