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
            throw {
                code: 401,
                error: 'Unauthorized access.'
            }
        }

        const token = await createJWT({ uid: user.id });

        return ({
            user,
            token
        });
        
    } catch (error) {
        console.log('ERROR', error);

        if(error.code === 401) throw error;

        throw {
            code: 500,
            error: 'Internal server error.'
        }    
    }
};

module.exports = verifyGoogleUser;