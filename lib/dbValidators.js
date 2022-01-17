const Role = require('../models/Role');
const User = require('../models/User');

const roleValidator = async (role = '', method = "post") => {
    if(!role && method === "put") return;

    const roleExists = await Role.findOne({ name: role });

    if(!roleExists) {
        throw new Error('The role does not exists.');
    }
};

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

const userValidator = async (id = '') => {
    const userExists = await User.findById(id);

    if(!userExists) {
        throw new Error('The user does not exists.');
    };
};

module.exports = {
    roleValidator,
    emailPostValidator,
    emailAndStatusValidator,
    userValidator,
};