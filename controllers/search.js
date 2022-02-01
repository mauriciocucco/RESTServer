const { response } = require('express');
const { searchByCollection } = require('../services/search');

const search = async (req, res = response) => {
    try {
        const result = await searchByCollection(req);
    
        res.json({
            results: !result ? [] : Array.isArray(result) ? result : [result]
        })
        
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(error.code || 500).json({
            error: error.error || 'Internal server error'
        })
    }

};

module.exports = {
    search
};