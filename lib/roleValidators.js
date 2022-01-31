const Role = require('../models/Role');

const roleExists = async (role = '') => {
    const exists = await Role.findOne({ name: role });

    if(!exists) {
        throw new Error('The role does not exists.');
    }
};

module.exports = {
    roleExists
};