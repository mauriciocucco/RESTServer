const User = require('../models/User');
const { showUser } = require('../services/users');
const createJWT = require('./createJWT');

const verifyGoogleUser = async ({ name, email, image }) => {
    try {
        let user = await showUser({ email });

        if(!user) { //si no existe lo creo
            user = new User({
                name,
                email,
                image,
                password: '1234',
                google: true,
                role: 'USER_ROLE'
            });

            await user.save();
        }

        if(!user.status) { //el usuario fue creado por Google pero esta desactivado
            const error = new Error('Unauthorized access.');

            error.status = 401;

            throw error;
        }

        const token = await createJWT({ uid: user.id });

        return ({
            user,
            token
        });
        
    } catch (error) {
        console.log('ERROR', error);

        throw error;  
    }
};

module.exports = verifyGoogleUser;