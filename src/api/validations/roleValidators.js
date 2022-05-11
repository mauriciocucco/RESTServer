const Role = require('../models/Role')

const roleExists = async (role = '') => {
    const exists = await Role.findOne({ name: role })

    if (!exists) {
        const error = new Error('The role does not exists.')

        throw error
        // throw new Error('The role does not exists.');
    }
}

module.exports = {
    roleExists,
}
