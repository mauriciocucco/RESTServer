const { userExists, productExistsById } = require('../lib/userValidators');

const verifyModel = async (collection = '', id = '') => {
    try {
        let model;
        
        switch (collection) {
            case 'users':
                model = await userExists(id);
                break;
            case 'products':
                model = await productExistsById(id);
                break;    
            default:
                throw {
                    code: 500,
                    error: 'Internal server error'
                }
        }

        return model;
        
    } catch (error) {
        console.log('ERROR: ', error);

        throw (error instanceof Error) ? 
            {
                code: 400,
                error: error.message
            } 
            : error;
    }
};

module.exports = verifyModel;